import  { Router, Request, Response } from 'express';
import { getAllDiffusions, getDiffusionById, createDiffusion } from '../../../../controllers/herbier/plante/besoin/diffusionLumiereController';

const router = Router();

router.get('/', getAllDiffusions);
router.get('/:id', getDiffusionById);

router.post('/', createDiffusion);

export default router;
