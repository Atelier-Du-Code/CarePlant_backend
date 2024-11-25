// arrosageRoutes.ts
import { Router } from 'express';
import arrosageController from '../controllers/arrosageController'; 

const router = Router();

router.get('/', arrosageController.getAllArrosages);
router.get('/:id', arrosageController.getArrosageById);

export default router;
