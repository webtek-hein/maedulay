const http = require('http');
const express = require('express')
const parser = require('body-parser')
const ejs = require('ejs')
const flash = require('req-flash')
const session = require('express-session')

const app = express()
const users = require('./model/users.js')
const tutorials = require('./model/tutorials.js')
const booking = require('./model/booking.js')

const hostname = '127.0.0.1';
const port = 3000;

app.set('view engine','ejs');

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(express.static('public'))
app.use(flash())
app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))



app.get('/', (req, res) => res.send('Server is up!'))

app.route('/login')
.get(function(req, res) {
  res.render('login',{error: req.flash('error')})
})
.post(function(req, res) {
  username = req.body.username
  password = req.body.pass

  users.find_user(username,function(data) {
    if (data) {
      if (data.password == password){
        if(data.usertype == 'client'){
          res.redirect('/client/tutorials')
        }else{
          res.redirect('/mentor/tutorials')
        }
      } else{
        req.flash('error','Password does not match.')
        res.redirect('/login')
      }

    }else{
      req.flash('error','Username not found.')
      res.redirect('/login')
    }

  });
})


app.route('/client/tutorials')
.get(function (req, res) {
  if(req.query.subject_id){
  	subject_id = req.query.subject_id
  	tutorials.get_subject_details(subject_id,function(data) {
  		schedule = {}
  		data.forEach(function(sched) {
  			schedule[sched.scheduleid] = {
  				'teacher': sched.teacher,
  				'schedule': sched.schedule
  			}
  		})
  		res.json(schedule)
  	})
  }else{
    var uid = 3
    list = {}
  	tutorials.get_all_subjects(function(sub) {
      booking.get_booking_by_id(uid, function(books) {
        books.forEach(function(data) {
          list[data.subjectid] = {
            'status':data.status,
            'bookid': data.bookid
          }
        })
        res.render('tutorials',{subjects: sub, booking: list})
      })
    	
  	})
  }
})
.post(function (req, res) {
  var uid = 3
  var scheduleid = req.body.schedule
  booking.add_new_booking(scheduleid, uid, function(insertId) {
    res.redirect('/client/tutorials')
  })
  
})
.put(function (req, res) {
  var bookid = req.body.bookid
  booking.cancel_booking(bookid,function(data) {
    res.json(data)
  });
})
.delete(function (req, res) {
  res.send('Delete a random tutorial')
});





app.listen(port, () => console.log(`Server running at http://${hostname}:${port}/`))