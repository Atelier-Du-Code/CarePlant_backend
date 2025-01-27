import  { Router, Request, Response } from 'express';
import { getAllFrequencesArrosage, getFrequenceArrosageById, createFrequenceArrosage } from '../../../../../controllers/herbier/plante/besoin/arrosage/frequenceArrosageController';

const router = Router();

router.get('/', getAllFrequencesArrosage);
router.get('/:id', getFrequenceArrosageById);

router.post('/', createFrequenceArrosage)

export default router;
