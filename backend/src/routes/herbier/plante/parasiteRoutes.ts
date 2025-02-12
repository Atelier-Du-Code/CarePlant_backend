import  { Router, Request, Response } from 'express';
import { getAllParasites, getParasiteById, createParasite, updateParasite, deleteParasite } from '../../../controllers/herbier/plante/parasiteController';

const router = Router();

router.get('/', getAllParasites);
router.get('/:id', getParasiteById);

router.post('/', createParasite);

router.put('/:id', updateParasite);
router.delete('/:id', deleteParasite);

export default router;
