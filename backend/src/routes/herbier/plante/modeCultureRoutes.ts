import  { Router, Request, Response } from 'express';
import { getAllModesCulture, getModeCultureById, createModeCulture, deleteModeCulture } from '../../../controllers/herbier/plante/modeCultureController';

const router = Router();

router.get('/', getAllModesCulture);
router.get('/:id', getModeCultureById);

router.post('/', createModeCulture);

router.delete('/:id', deleteModeCulture);

export default router;
