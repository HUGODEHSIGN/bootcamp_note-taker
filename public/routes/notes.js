import express from 'express';
import uuid from '../../helpers/uuid.js';
import {
  readFromFile,
  writeToFile,
  readAndAppend,
} from '../../helpers/fsUtils.js';

const notes = express.Router();

notes.get('/', (req, res) => {
  readFromFile('./db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  console.log('post to /api/notes', req.body);

  if (req.body) {
    const { title, text } = req.body;
    const newNote = {
      id: uuid(),
      title,
      text,
    };
    readAndAppend(newNote, './db.json');
  }
});

notes.delete('/:id', (req, res) => {
  const paramsId = req.params.id;
  readFromFile('./db.json')
    .then((data) => JSON.parse(data))
    .then((notes) => notes.filter(({ id }) => id !== paramsId))
    .then((filteredData) => writeToFile('./db.json', filteredData))
    .then(() => res.json(`Note deleted successfully`));
});

export default notes;
