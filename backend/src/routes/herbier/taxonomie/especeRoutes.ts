import  { Router, Request, Response } from 'express';
import { getAllEspeces, getEspeceById } from '../../../controllers/herbier/taxonomie/especeController';

const router = Router();

router.get('/', getAllEspeces);
router.get('/:id', getEspeceById);

export default router;
