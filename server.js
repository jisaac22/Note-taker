// install packages for application 
const express = require('express')
const path = require('path')
const fs = require('fs')

// set up for express app and port to use for application
const app = express()
const PORT = 3000;
var notes = JSON.parse(fs.readFile(__dirname + '/Develop/db/db.json', function (err){
    if (err)
    throw err
}))
// set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/Develop/public')))


// link routes for html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/Develop/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/Develop/public/notes.html')));

// link routes for api to read from json file
app.post('/api/notes', function (req, res ) {
    fs.readFile(__dirname + '/Develop/db/db.json', function (err,) {
        if (err) {
            return console.log(err)
        } else { 
            let newNote = {title: req.body.title, text: req.body.text}
            console.log(newNote)
            notes.push(newNote)
            fs.writeFile(__dirname + '/Develop/db/db.json', JSON.stringify(notes), function (err){
                if (err){
                    throw err
                }
            }
                
            )
        }
    })
});

app.get('/api/notes',(req, res) => {
    fs.readFile(__dirname + '/Develop/db/db.json', function(err, data){
        if (err){
            throw err
        } else {
         res.send(data)
        }
    })
})




app.listen(PORT, function(){
    console.log('App listening on PORT' + PORT)
});