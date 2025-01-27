import  { Router, Request, Response } from 'express';
import { getAllParasites, getParasiteById } from '../../../controllers/herbier/plante/parasiteController';

const router = Router();

router.get('/', getAllParasites);
router.get('/:id', getParasiteById);

export default router;
