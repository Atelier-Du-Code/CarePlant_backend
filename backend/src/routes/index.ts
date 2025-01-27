import { Router } from 'express';

import couleursRoutes from '../routes/herbier/caracteristiques/morphologie/couleurRoutes';
import croissanceRoutes from '../routes/herbier/caracteristiques/morphologie/croissanceRoutes';
import formeFeuilleRoutes from '../routes/herbier/caracteristiques/morphologie/formeFeuilleRoutes';
import morphologieRoutes from '../routes/herbier/caracteristiques/morphologie/morphologieRoutes';
import plantesRoutes from './herbier/plante/planteRoutes';
import arrosageRoutes from './herbier/plante/besoin/arrosage/arrosageRoutes';
import origineRoutes from './herbier/caracteristiques/origineRoutes';
import solTypeRoutes from './herbier/caracteristiques/solTypeRoutes';
import frequenceArrosageRoutes from './herbier/plante/besoin/arrosage/frequenceArrosageRoutes';
import saisonRoutes from './herbier/plante/besoin/arrosage/saisonRoutes';
import astuceRoutes from './herbier/plante/besoin/astuce/astuceRoutes';
import typeAstuceRoutes from './herbier/plante/besoin/astuce/typeAstuceRoutes';
import besoinRoutes from './herbier/plante/besoin/besoinRoutes';


const router = Router();

router.use('/morphologies', morphologieRoutes);
router.use('/couleurs', couleursRoutes);
router.use('/croissances', croissanceRoutes);
router.use('/formeFeuilles', formeFeuilleRoutes);
router.use('/origines', origineRoutes);
router.use('/solTypes', solTypeRoutes);


router.use('/plantes', plantesRoutes);

router.use('/arrosages', arrosageRoutes);
router.use('/frequencesArrosage', frequenceArrosageRoutes);
router.use('/saisons', saisonRoutes);

router.use('/astuces', astuceRoutes);
router.use('/typesAstuce', typeAstuceRoutes);

router.use('/besoins', besoinRoutes);
// router.use('/', );
// router.use('/', );
// router.use('/', );

// router.use('/', );
// router.use('/', );
// router.use('/', );
// router.use('/', );
// router.use('/', );


// router.use('/', );
// router.use('/', );
// router.use('/', );
// router.use('/', );






export default router;
