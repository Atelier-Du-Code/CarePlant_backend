import  { Router, Request, Response } from 'express';
import { getAllCouleurs, getCouleurById, createCouleur} from '../../../../controllers/herbier/caracteristiques/morphologie/couleurController';

const router = Router();

router.get('/', getAllCouleurs);
router.get('/:id', getCouleurById);

router.post('/', createCouleur);


export default router;
