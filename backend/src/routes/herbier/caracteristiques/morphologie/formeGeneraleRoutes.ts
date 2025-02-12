import  { Router, Request, Response } from 'express';
import { getAllFormesGenerale, getFormeGeneraleById, createFormeGenerale, updateFormeGenerale, deleteFormeGenerale } from '../../../../controllers/herbier/caracteristiques/morphologie/formeGeneraleController';

const router = Router();

router.get('/', getAllFormesGenerale);
router.get('/:id', getFormeGeneraleById);

router.post('/', createFormeGenerale);

router.put('/:id', updateFormeGenerale);
router.delete('/:id', deleteFormeGenerale);

export default router;
