import express from 'express';
import notesRouter from './notes.js';
const router = express.Router();

router.use('/notes', notesRouter);

export default router;
