import { Request, Response } from 'express';
import ImagesPlanteModel from '../../../models/herbier/plante/imagesPlanteModel';


// Récupérer tous les images d'une plante
export const getAllImagesForOnePlante = async (req: Request, res: Response): Promise<void> => {
    try {

        const { idPlante } = req.params;
        const images = await ImagesPlanteModel.find({ idPlante });

        if( !images || images.length == 0 )
        {
            res.status(404).json({ message: "Aucune image trouvée pour cette plante"});
            return;
        }

        res.status(200).json(images);        
    } catch (error:unknown) {

        if (error instanceof Error) {
          
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des images de la plante' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue' });
        }
    }
};


// Récupérer une image d'une plante par son id 
export const getOneImageForOnePlante = async (req: Request, res: Response): Promise<void> => {
    try {
        
       
        const { idPlante, idImagePlante } = req.params;
        const image = await ImagesPlanteModel.findById({ idPlante, idImagePlante });

        if (!image) {
            res.status(404).json({ message: 'Image de plante non trouvée' });
            return;
        }
        
        res.status(200).json(image);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de l'image de la plante" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de l'image de la plante" });
        }
    }
}


// Créer une nouvelle origine
export const createImagePlante = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nom, description } = req.body;

        if (!nom || !description) {
            res.status(400).json({ message: 'Les champs "nom" et "description" sont requis.' });
            return;
        }


        const existingOrigine = await ImagesPlanteModel.findOne({ nom });

        if (existingOrigine) {
            res.status(409).json({ message: "Une origine avec ce nom existe déjà." });
            return;
        }

        const nouvelleOrigine = new OrigineModel({ nom, description });
        const saveOrigine = await nouvelleOrigine.save();

        res.status(201).json(saveOrigine);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création de l'origine" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de l'origine" });
        }
    }
};


// Supprimer une origine par ID
export const deleteOrigine = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const origine = await OrigineModel.findByIdAndDelete(id);

        if (!origine) {
            res.status(404).json({ message: "Origine non trouvée" });
            return;
        }

        res.status(200).json({ message: "Origine supprimée avec succès" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la suppression de l'origine" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la suppression de l'origine" });
        }
    }
};

const genreController = {
    getAllImagesForOnePlante,
    getOneImageForOnePlante
};

export default genreController;