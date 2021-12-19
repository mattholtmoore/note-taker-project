// Modules required listed at top
const express = require('express');
const fs = require('fs');
const util = require('util');

const path = require('path');
const notes = require('./db/db.json');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Request for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// POST Request for api/notes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'))
})

// GET Request for homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

// POST request to add a note
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const newNote = req.body;
  newNote.id = uuid()

  if (req.body) {

    // Obtain existing notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });
    const response = {
      status: 'Success!',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});

// 11-Express > 01-Activities > 23-Ins_Custom-Middleware
app.delete('api/notes/:id', (req, res) => {
  let parsedNotes = JSON.parse(fs.readfilesync("./db/db.json"), utf8);
  const noteId = req.params.id;
  parsedNotes.


  fs.writeFile(
    './db/db.json',
    JSON.stringify(parsedNotes, null, 4),
    (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info('Successfully updated notes!')
  );
});

//Server listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);