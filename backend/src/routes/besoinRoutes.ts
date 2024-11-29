import  { Router, Request, Response } from 'express';
import { getAllBesoins, getBesoinById } from '../controllers/besoinController';

const router = Router();

router.get('/', getAllBesoins);
router.get('/:id', getBesoinById);

export default router;
