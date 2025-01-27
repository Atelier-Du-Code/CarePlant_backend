import  { Router, Request, Response } from 'express';
import { getAllAstuces, getAstuceById, createAstuce } from '../../../../../controllers/herbier/plante/besoin/astuce/astuceController';

const router = Router();

router.get('/', getAllAstuces);
router.get('/:id', getAstuceById);

router.post('/', createAstuce)

export default router;
