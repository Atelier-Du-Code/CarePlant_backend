import  { Router, Request, Response } from 'express';
import { getAllMorphologies, getMorphologieById } from '../controllers/morphologieController';

const router = Router();

router.get('/', getAllMorphologies);
router.get('/:id', getMorphologieById);

export default router;
