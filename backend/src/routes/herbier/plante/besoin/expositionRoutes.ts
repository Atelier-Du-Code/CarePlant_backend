import  { Router, Request, Response } from 'express';
import { getAllExpositions, getExpositionById, createExposition, updateExposition, deleteExposition } from '../../../../controllers/herbier/plante/expositionController';

const router = Router();

router.get('/', getAllExpositions);
router.get('/:id', getExpositionById);

router.post('/', createExposition);

router.put('/:id', updateExposition);
router.delete('/:id', deleteExposition);

export default router;
