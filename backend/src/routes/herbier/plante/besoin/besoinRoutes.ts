import  { Router, Request, Response } from 'express';
import { getAllBesoins, getBesoinById, createBesoin } from '../../../../controllers/herbier/plante/besoin/besoinController';

const router = Router();

router.get('/', getAllBesoins);
router.get('/:id', getBesoinById);

router.post('/', createBesoin);

export default router;
