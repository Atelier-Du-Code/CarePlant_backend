import { Router } from 'express';
import plantesRoutes from '../routes/planteRoutes'
import arrosageRoutes from '../routes/arrosageRoutes';


const router = Router();

router.use('/plantes', plantesRoutes);
router.use('/arrosages', arrosageRoutes);





export default router;
