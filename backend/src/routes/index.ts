import { Router } from 'express';
import arrosageRoutes from '../routes/arrosageRoutes';

const router = Router();

router.use('/arrosages', arrosageRoutes);





export default router;