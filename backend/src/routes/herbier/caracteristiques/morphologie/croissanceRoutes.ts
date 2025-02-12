import  { Router, Request, Response } from 'express';
import { getAllCroissances, getCroissanceById, createCroissance, updateCroissance, deleteCroissance } from '../../../../controllers/herbier/caracteristiques/morphologie/croissanceController';

const router = Router();

router.get('/', getAllCroissances);
router.get('/:id', getCroissanceById);

router.post('/', createCroissance);

router.put('/:id', updateCroissance);
router.delete('/:id', deleteCroissance);

export default router;
