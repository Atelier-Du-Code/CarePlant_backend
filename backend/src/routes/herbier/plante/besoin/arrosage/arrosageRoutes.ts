import  { Router, Request, Response } from 'express';
import { createArrosage, getAllArrosages, getArrosageById } from '../../../../../controllers/herbier/plante/besoin/arrosage/arrosageController';

const router = Router();

router.get('/', getAllArrosages);
router.get('/:id', getArrosageById);

router.post('/', createArrosage);

export default router;
