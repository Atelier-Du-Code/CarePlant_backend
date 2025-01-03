import  { Router, Request, Response } from 'express';
import { getAllVarietes, getVarieteById } from '../controllers/varieteController';

const router = Router();

router.get('/', getAllVarietes);
router.get('/:id', getVarieteById);

export default router;
