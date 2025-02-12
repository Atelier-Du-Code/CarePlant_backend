import  { Router, Request, Response } from 'express';
import { getAllTextures, getTextureById, createTexture, updateTexture, deleteTexture } from '../../../../controllers/herbier/caracteristiques/morphologie/textureController';

const router = Router();

router.get('/', getAllTextures);
router.get('/:id', getTextureById);

router.post('/', createTexture);

router.put('/:id', updateTexture);
router.delete('/:id', deleteTexture);
export default router;
