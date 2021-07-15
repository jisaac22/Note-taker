// install packages for application 
const express = require('express')
const path = require('path')
const fs = require('fs')

// set up for express app and port to use for application
const app = express()
const PORT = process.env.PORT || 8080;

// set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// points to server for route file, routes gives server a map how to respond
require('./assets/js/index')(app);

// link routes for html
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// link routes for api to read from json file
app.get('/api/notes', function (req, res) {
    fs.readFile(__dirname + '/db/db.json', function (err, data) {
        if (err) {
          return console.log(err)
        } else {
            res.json(JSON.parse(data))
        }
    })
});

app.post('/api/notes', function (req, res ) {
    fs.readFile(__dirname + '/db/db.json', function (err, data) {
        if (err) {
            return console.log(err)
        } else {
            notes = JSON.parse(notes)
            let id = notes[notes.length -1].id + 1
            let newNote = { title: req.body.title, text: req.body.text, id: id}
            let activeNote = notes.concat(newNote)

            fs.writeFile(__dirname + 'db/db.json', JSON.stringify(activeNote), function (err, data){
                if (err){
                    return error
                } else{
                    console.log(activeNote)
                    res.json(activeNote)
                }
            })
        }
    })
});
