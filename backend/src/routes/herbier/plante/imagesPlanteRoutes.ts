import  { Router, Request, Response } from 'express';
import { getAllImagesForOnePlante, getOneImageForOnePlante } from '../../../controllers/herbier/plante/imagesPlanteController';

const router = Router();

router.get('/:idPlante', getAllImagesForOnePlante);
router.get('/:idPlante/:idImagePlante', getOneImageForOnePlante);

export default router;
