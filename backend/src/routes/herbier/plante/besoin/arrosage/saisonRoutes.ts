import  { Router, Request, Response } from 'express';
import { getAllSaisons, getSaisonById } from '../../../../../controllers/herbier/plante/besoin/arrosage/saisonController';

const router = Router();

router.get('/', getAllSaisons);
router.get('/:id', getSaisonById);

export default router;
