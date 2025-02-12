import { Request, Response } from 'express';
import MorphologieModel from '../../../../models/herbier/caracteristiques/morphologie/morphologieModel';
import FormeGeneraleModel from '../../../../models/herbier/caracteristiques/morphologie/formeGeneraleModel';
import FormeFeuilleModel from '../../../../models/herbier/caracteristiques/morphologie/formeFeuilleModel';
import CroissanceModel from '../../../../models/herbier/caracteristiques/morphologie/croissanceModel';
import TextureModel from '../../../../models/herbier/caracteristiques/morphologie/textureModel';
import CouleurModel from '../../../../models/herbier/caracteristiques/morphologie/couleurModel';

// Récupérer toutes les morphologies
export const getAllMorphologies = async (req: Request, res: Response): Promise<void> => {
    try {
        const morphologies = await MorphologieModel.find();

        if( morphologies.length == 0)
        {
            res.status(404).json({ message: "Aucune morphologie trouvée"});
            return;
        }

        res.status(200).json(morphologies);        
    } catch (error) {
        if (error instanceof Error) {           
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des morphologies' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue' });
        }
    }
};

// Récupérer Morphologie par ID
export const getMorphologieById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        
        const morphologie = await MorphologieModel.findById(id);

        if (!morphologie) {
            res.status(404).json({ message: 'Morphologie non trouvée' });
            return;
        }
        
        res.status(200).json(morphologie);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération de la morphologie' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération de la morphologie' });
        }
    }
}

export const createMorphologie = async (req: Request, res: Response): Promise<void> => {
    
    try {
        
        const { idFormeGenerale, idFormeFeuille, idTextures, idCouleurs, taillesMax, idCroissance } = req.body;

        // Vérification des données requises
        if (!idFormeGenerale || !idFormeFeuille || !idTextures || !idCouleurs || !taillesMax || !idCroissance) {
            res.status(400).json({ message: 'Tous les champs sont requis.' });
            return;
        }

        if (!Array.isArray(idTextures) || !Array.isArray(idCouleurs)) {
            res.status(400).json({ message: "idTextures et idCouleurs doivent être des tableaux." });
            return;
        }

         // Vérification de l'existence de chaque ID en base avec Promise.all
         const [formeGenerale, formeFeuille, croissance, textures, couleurs] = await Promise.all([
            FormeGeneraleModel.findById(idFormeGenerale),
            FormeFeuilleModel.findById(idFormeFeuille),
            CroissanceModel.findById(idCroissance),
            TextureModel.find({ _id: { $in: idTextures } }), 
            CouleurModel.find({ _id: { $in: idCouleurs } })
        ]);

        if (!formeGenerale) {
            res.status(400).json({ message: "La forme générale spécifiée n'existe pas." });
            return;
        }

        if (!formeFeuille) {
            res.status(400).json({ message: "La forme de feuille spécifiée n'existe pas." });
            return;
        }

        if (!croissance) {
            res.status(400).json({ message: "Le type de croissance spécifié n'existe pas." });
            return;
        }

        if (textures.length !== idTextures.length) {
            res.status(400).json({ message: "Une ou plusieurs textures n'existent pas." });
            return;
        }

        if (couleurs.length !== idCouleurs.length) {
            res.status(400).json({ message: "Une ou plusieurs couleurs n'existent pas." });
            return;
        }

        // Vérification de la duplication de la morphologie
        const existingMorphologie = await MorphologieModel.findOne({ 
            formeGenerale: idFormeGenerale, 
            formeFeuille: idFormeFeuille, 
            textures: idTextures, 
            couleurs: idCouleurs, 
            taillesMax, 
            croissance: idCroissance 
        });

        if (existingMorphologie) {
            res.status(409).json({ message: "Cette morphologie existe déjà." });
            return;
        }

        // Création de la morphologie
        const nouvelleMorphologie = new MorphologieModel({
            formeGenerale: idFormeGenerale,
            formeFeuille: idFormeFeuille,
            textures: idTextures,
            couleurs: idCouleurs,
            taillesMax,
            croissance: idCroissance
        });

         const saveMorphologie  = await nouvelleMorphologie.save();

        res.status(200).json(saveMorphologie);

    } catch (error:unknown) {

        console.log(error);
        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création de la morphologie" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de la morphologie" });
        }
    }
}

// Mettre à jour une morphologie
export const updateMorphologie = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedMorphologie = await MorphologieModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMorphologie) {
            res.status(404).json({ message: "Morphologie non trouvée." });
            return;
        }
        res.status(200).json(updatedMorphologie);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la morphologie." });
    }
};

// Supprimer une morphologie
export const deleteMorphologie = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedMorphologie = await MorphologieModel.findByIdAndDelete(id);
        if (!deletedMorphologie) {
            res.status(404).json({ message: "Morphologie non trouvée." });
            return;
        }
        res.status(200).json({ message: "Morphologie supprimée avec succès." });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la morphologie." });
    }
};

const MorphologieController = {
    getAllMorphologies,
    getMorphologieById,
    createMorphologie,
    updateMorphologie,
    deleteMorphologie
};

export default MorphologieController;
