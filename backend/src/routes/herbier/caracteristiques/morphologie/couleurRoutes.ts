import  { Router, Request, Response } from 'express';
import { getAllCouleurs, getCouleurById, createCouleur, updateCouleur, deleteCouleur} from '../../../../controllers/herbier/caracteristiques/morphologie/couleurController';

const router = Router();

router.get('/', getAllCouleurs);
router.get('/:id', getCouleurById);

router.post('/', createCouleur);

router.put('/:id', updateCouleur);
router.delete('/:id', deleteCouleur);


export default router;
