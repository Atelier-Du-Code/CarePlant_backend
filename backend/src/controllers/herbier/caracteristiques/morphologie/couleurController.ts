import { Request, Response } from 'express';
import CouleurModel from '../../../../models/herbier/caracteristiques/morphologie/couleurModel';


// Récupérer toutes les couleurs
export const getAllCouleurs = async (req: Request, res: Response): Promise<void> => {
    try {
        const couleurs = await CouleurModel.find();

        if( couleurs.length == 0)
        {
            res.status(404).json({ message: "Aucune couleur trouvée"});
            return;
        }

        res.status(200).json(couleurs);        
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des couleurs' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération des couleurs' });
        }
    }
};


// Récupérer une couleur par ID
export const getCouleurById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        
        const couleur = await CouleurModel.findById(id);

        if (!couleur) {
            res.status(404).json({ message: 'couleur non trouvée' });
            return;
        }
        
        res.status(200).json(couleur);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de la couleur" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de la couleur" });
        }
    }
}

export const createCouleur = async (req: Request, res: Response): Promise<void> => {
    
    try {
        
        const { nom, description } = req.body;

        if (!nom || !description) {
           res.status(400).json({ message: 'Les champs "nom" et "description" sont requis.' });
           return;
        }
        
        const nouvelleCouleur = new CouleurModel({nom, description});
        const saveCouleur = await nouvelleCouleur.save();

        res.status(200).json(saveCouleur);

    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création de la couleur" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de la couleur" });
        }
    }
}


const CouleurController = {
    getAllCouleurs,
    getCouleurById,
    createCouleur,
};

export default CouleurController;