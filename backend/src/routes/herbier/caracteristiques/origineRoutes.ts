import  { Router, Request, Response } from 'express';
import { createOrigine, getAllOrigines, getOrigineById, updateOrigine, deleteOrigine} from '../../../controllers/herbier/caracteristiques/origineController';

const router = Router();

router.get('/', getAllOrigines);
router.get('/:id', getOrigineById);

router.post('/', createOrigine);

router.put('/:id', updateOrigine);
router.delete('/:id', deleteOrigine);


export default router;
