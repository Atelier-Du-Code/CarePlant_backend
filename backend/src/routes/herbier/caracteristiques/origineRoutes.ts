import  { Router, Request, Response } from 'express';
import { createOrigine, getAllOrigines, getOrigineById } from '../../../controllers/herbier/caracteristiques/origineController';

const router = Router();

router.get('/', getAllOrigines);
router.get('/:id', getOrigineById);

router.post('/', createOrigine);

export default router;
