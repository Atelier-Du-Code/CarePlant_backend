import  { Router, Request, Response } from 'express';
import { getAllArrosages, getArrosageById } from '../controllers/arrosageController';

const router = Router();

router.get('/', getAllArrosages);
router.get('/:id', getArrosageById);

export default router;
