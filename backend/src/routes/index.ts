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
import diffusionLumiereRoutes from './herbier/plante/besoin/diffusionLumiereRoutes';
import formeGeneraleRoutes from './herbier/caracteristiques/morphologie/formeGeneraleRoutes';
import textureRoutes from './herbier/caracteristiques/morphologie/textureRoutes';
import emplacementRoutes from './herbier/plante/emplacementRoutes';
import modeCultureRoutes from './herbier/plante/modeCultureRoutes';
import parasiteRoutes from './herbier/plante/parasiteRoutes';
import expositionRoutes from './herbier/plante/besoin/expositionRoutes';




const router = Router();


//Herbier

//-/Caractéristiques

//-/-/Morphologies
router.use('/morphologies', morphologieRoutes);
router.use('/couleurs', couleursRoutes);
router.use('/croissances', croissanceRoutes);
router.use('/formesFeuilles', formeFeuilleRoutes);
router.use('/formesGenerale', formeGeneraleRoutes);
router.use('/textures', textureRoutes);

//-/-/Autre
router.use('/origines', origineRoutes);

//-/Plante
router.use('/emplacements', emplacementRoutes);
//router.use('/imagesPlantes', );
router.use('/modesCulture', modeCultureRoutes);
router.use('/parasites', parasiteRoutes);
//router.use('/plantes', plantesRoutes);

//-/-/Besoin
//router.use('/besoins', besoinRoutes);
// router.use('/diffusionsLumiere', diffusionLumiereRoutes);
router.use('/expositions', expositionRoutes);
router.use('/solTypes', solTypeRoutes);
// router.use('/tauxHumidite', );


// //-/-/-/Arrosage
// router.use('/arrosages', arrosageRoutes);
// router.use('/frequencesArrosage', frequenceArrosageRoutes);
// router.use('/saisons', saisonRoutes);

//-/-/-/Astuce
// router.use('/astuces', astuceRoutes);
// router.use('/typesAstuce', typeAstuceRoutes);

//-/Taxonomie
// router.use('/espece', );
// router.use('/famille', );
// router.use('/genre', );
// router.use('/variete', );

export default router;
