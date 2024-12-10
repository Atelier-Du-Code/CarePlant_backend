import  { Router, Request, Response } from 'express';
import { getAllOrigines, getOrigineById } from '../controllers/origineController';

const router = Router();

router.get('/', getAllOrigines);
router.get('/:id', getOrigineById);

export default router;
