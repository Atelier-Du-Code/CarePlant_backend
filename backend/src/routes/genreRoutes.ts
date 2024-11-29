import  { Router, Request, Response } from 'express';
import { getAllGenres, getGenreById } from '../controllers/genreController';

const router = Router();

router.get('/', getAllGenres);
router.get('/:id', getGenreById);

export default router;
