import  { Router, Request, Response } from 'express';
import { getAllParasites, getParasiteById } from '../controllers/parasiteController';

const router = Router();

router.get('/', getAllParasites);
router.get('/:id', getParasiteById);

export default router;
