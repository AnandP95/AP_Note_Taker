const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Function to read data from db.json
function readNotes() {
  const notesData = fs.readFileSync(path.join(__dirname, '../db.json'), 'utf8');
  return JSON.parse(notesData);
}

// Function to write data to db.json
function writeNotes(notes) {
  fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(notes), 'utf8');
}

// GET /api/notes 
router.get('/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST /api/notes 
router.post('/notes', (req, res) => {
  const notes = readNotes();
  const newNote = req.body;

  // Generate a unique ID for the new note 
  newNote.id = uuidv4();;

  notes.push(newNote);
  writeNotes(notes);

  res.json(newNote);
});

module.exports = router;