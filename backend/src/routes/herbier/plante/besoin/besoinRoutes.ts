import  { Router, Request, Response } from 'express';
import { getAllBesoins, getBesoinById, createBesoin, updateBesoin, deleteBesoin } from '../../../../controllers/herbier/plante/besoin/besoinController';

const router = Router();

router.get('/', getAllBesoins);
router.get('/:id', getBesoinById);

router.post('/', createBesoin);

router.put('/:id', updateBesoin);
router.delete('/:id', deleteBesoin);


export default router;
