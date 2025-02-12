import  { Router } from 'express';
import { createFormeFeuille, getAllFormeFeuilles, getFormeFeuilleById, updateFormeFeuille, deleteFormeFeuille } from '../../../../controllers/herbier/caracteristiques/morphologie/formeFeuilleController';

const router = Router();

router.get('/', getAllFormeFeuilles);
router.get('/:id', getFormeFeuilleById);

router.post('/', createFormeFeuille);

router.put('/:id', updateFormeFeuille);
router.delete('/:id', deleteFormeFeuille);

export default router;
