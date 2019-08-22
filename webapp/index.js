const http = require('http');
const express = require('express')
const app = express()

const hostname = '127.0.0.1';
const port = 3000;


app.get('/', (req, res) => res.send('Server is up!'))


app.route('/client/tutorials')
  .get(function (req, res) {
    res.send('Get a random tutorials')
  })
  .post(function (req, res) {
    res.send('Add a random tutorial')
  })
  .put(function (req, res) {
    res.send('Update the random tutorial')
  })
  .delete(function (req, res) {
    res.send('Delete a random tutorial')
  });





app.listen(port, () => console.log(`Server running at http://${hostname}:${port}/`))