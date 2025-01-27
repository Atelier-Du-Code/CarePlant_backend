import  { Router, Request, Response } from 'express';
import { createTypeSol, getAllSolTypes, getSolTypeById } from '../../../controllers/herbier/caracteristiques/solTypeController';

const router = Router();

router.get('/', getAllSolTypes);
router.get('/:id', getSolTypeById);

router.post('/:id', createTypeSol);

export default router;
