import  { Router, Request, Response } from 'express';
import { getAllEmplacements, getEmplacementById, createEmplacement, updateEmplacement, deleteEmplacement } from '../../../controllers/herbier/plante/emplacementController';

const router = Router();

router.get('/', getAllEmplacements);
router.get('/:id', getEmplacementById);

router.post('/', createEmplacement);

router.put('/:id', updateEmplacement);
router.delete('/:id', deleteEmplacement);

export default router;
