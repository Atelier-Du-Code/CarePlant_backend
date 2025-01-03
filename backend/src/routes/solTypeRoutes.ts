import  { Router, Request, Response } from 'express';
import { getAllSolTypes, getSolTypeById } from '../controllers/solTypeController';

const router = Router();

router.get('/', getAllSolTypes);
router.get('/:id', getSolTypeById);

export default router;
