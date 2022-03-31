// install packages for application 
const express = require('express')
const path = require('path')
const fs = require('fs')
// const { v4: uuidv4 } = require("uuid");


// set up for express app and port to use for application
const app = express()
const PORT = process.env.PORT || 3000;

const { uuid } = require('uuidv4');
// set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/Develop/public')))


// link routes for html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/Develop/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/Develop/public/notes.html')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/Develop/db/db.json')));
// link routes for api to read from json file
app.post('/api/notes', function (req, res) {
  fs.readFile(__dirname + '/Develop/db/db.json', function (err,) {
    if (err) {
      return console.log(err)
    } else {
      let id = uuid()
      let newNote = { title: req.body.title, text: req.body.text, id: id }
      var notes = JSON.parse(fs.readFileSync(__dirname + '/Develop/db/db.json', 'utf8'))
      console.log(newNote)
      notes.push(newNote)
      res.json(newNote)

      fs.writeFile(__dirname + '/Develop/db/db.json', JSON.stringify(notes), function (err) {
        if (err) {
          throw err
        }
      })
    }
  })
});


   


app.listen(PORT, function(){
    console.log('App listening on PORT' + PORT)
});