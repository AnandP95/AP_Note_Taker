const fs = require('fs');
const path = require('path');

const DB_FILE_PATH = path.join(__dirname, 'db.json');

function getNotes() {
  try {
    const notesData = fs.readFileSync(DB_FILE_PATH, 'utf8');
    return JSON.parse(notesData);
  } catch (error) {
    console.error('Error reading notes:', error);
    return [];
  }
}

function addNote(newNote) {
  try {
    const notes = getNotes();
    notes.push(newNote);
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(notes), 'utf8');
    return true;
  } catch (error) {
    console.error('Error adding note:', error);
    return false;
  }
}

function removeNote(noteId) {
  try {
    let notes = getNotes();
    notes = notes.filter(note => note.id !== noteId);
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(notes), 'utf8');
    return true;
  } catch (error) {
    console.error('Error removing note:', error);
    return false;
  }
}

module.exports = { getNotes, addNote, removeNote };
