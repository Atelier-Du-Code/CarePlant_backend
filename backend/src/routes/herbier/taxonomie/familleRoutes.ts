import  { Router, Request, Response } from 'express';
import { getAllFamille, getFamilleById } from '../../../controllers/herbier/taxonomie/familleController';

const router = Router();

router.get('/', getAllFamille);
router.get('/:id', getFamilleById);

export default router;
