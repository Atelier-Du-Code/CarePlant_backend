import  { Router, Request, Response } from 'express';
import { getAllMorphologies, getMorphologieById, createMorphologie, updateMorphologie, deleteMorphologie } from '../../../../controllers/herbier/caracteristiques/morphologie/morphologieController';

const router = Router();

router.get('/', getAllMorphologies);
router.get('/:id', getMorphologieById);

router.post('/', createMorphologie);


router.put('/:id', updateMorphologie);
router.delete('/:id', deleteMorphologie);


export default router;
