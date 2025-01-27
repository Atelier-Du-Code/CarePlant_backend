import  { Router, Request, Response } from 'express';
import { getAllCroissances, getCroissanceById, createCroissance } from '../../../../controllers/herbier/caracteristiques/morphologie/croissanceController';

const router = Router();

router.get('/', getAllCroissances);
router.get('/:id', getCroissanceById);

router.post('/', createCroissance)

export default router;
