import express from 'express';

const notes = express.Router();

notes.get('/', (req, res) => {
  console.log('read from /api/notes');
});

notes.post('/', (req, res) => {
  console.log('post to /api/notes');
});

export default notes;
