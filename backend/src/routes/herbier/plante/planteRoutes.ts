import  { Router, Request, Response } from 'express';
import { getAllPlantes, getPlanteById } from '../../../controllers/herbier/plante/planteController';

const router = Router();

router.get('/', getAllPlantes);
router.get('/:id', getPlanteById);

export default router;
