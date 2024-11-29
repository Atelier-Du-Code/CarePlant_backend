import  { Router, Request, Response } from 'express';
import { getAllFamille, getFamilleById } from '../controllers/familleController';

const router = Router();

router.get('/', getAllFamille);
router.get('/:id', getFamilleById);

export default router;
