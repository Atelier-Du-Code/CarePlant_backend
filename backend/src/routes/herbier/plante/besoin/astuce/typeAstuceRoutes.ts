import  { Router, Request, Response } from 'express';
import { getAllTypesAstuce, getTypeAstuceById, createTypeAstuce } from '../../../../../controllers/herbier/plante/besoin/astuce/typeAstuceController';

const router = Router();

router.get('/', getAllTypesAstuce);
router.get('/:id', getTypeAstuceById);

router.post('/', createTypeAstuce)

export default router;
