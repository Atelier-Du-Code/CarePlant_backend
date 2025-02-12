import  { Router, Request, Response } from 'express';
import { createTypeSol, getAllSolTypes, getSolTypeById, updateSolType, deleteSolType } from '../../../controllers/herbier/caracteristiques/solTypeController';

const router = Router();

router.get('/', getAllSolTypes);
router.get('/:id', getSolTypeById);

router.post('/', createTypeSol);


router.put('/:id', updateSolType);
router.delete('/:id', deleteSolType);

export default router;
