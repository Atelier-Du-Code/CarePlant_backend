import  { Router, Request, Response } from 'express';
import { createFormeFeuille, getAllFormeFeuilles, getFormeFeuilleById } from '../../../../controllers/herbier/caracteristiques/morphologie/formeFeuilleController';

const router = Router();

router.get('/', getAllFormeFeuilles);
router.get('/:id', getFormeFeuilleById);

router.post('/', createFormeFeuille);

export default router;
