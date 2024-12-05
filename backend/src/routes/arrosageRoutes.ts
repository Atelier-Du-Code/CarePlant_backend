import  { Router, Request, Response } from 'express';
import { getAllArrosages } from '../controllers/arrosageController';

const router = Router();

router.get('/', getAllArrosages);

export default router;