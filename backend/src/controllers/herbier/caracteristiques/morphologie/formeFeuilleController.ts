import { Request, Response } from 'express';
import FormeFeuilleModel from '../../../../models/herbier/caracteristiques/morphologie/formeFeuilleModel';


// Récupérer toutes les forme de feuille
export const getAllFormeFeuilles = async (req: Request, res: Response): Promise<void> => {
    try {
        const formeFeuilles = await FormeFeuilleModel.find();

        if( formeFeuilles.length == 0)
        {
            res.status(404).json({ message: "Aucune formeFeuille trouvée"});
            return;
        }

        res.status(200).json(formeFeuilles);        
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des forme de feuilles' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération des forme de feuilles' });
        }
    }
};


// Récupérer une FormeFeuille par ID
export const getFormeFeuilleById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        
        const formeFeuille = await FormeFeuilleModel.findById(id);

        if (!formeFeuille) {
            res.status(404).json({ message: 'formeFeuille non trouvée' });
            return;
        }
        
        res.status(200).json(formeFeuille);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de la formeFeuille" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de la formeFeuille" });
        }
    }
}


export const createFormeFeuille = async (req: Request, res: Response): Promise<void> => {
    
    try {
        
        const { nom, description } = req.body;

        if (!nom || !description) {
           res.status(400).json({ message: 'Les champs "nom" et "description" sont requis.' });
           return;
        }
        
        const nouvelleFormeFeuille = new FormeFeuilleModel({nom, description});
        const saveFormeFeuille  = await nouvelleFormeFeuille.save();

        res.status(200).json(saveFormeFeuille );

    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création de la FormeFeuille" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de la FormeFeuille" });
        }
    }
}



const FormeFeuilleController = {
    getAllFormeFeuilles,
    getFormeFeuilleById, 
    createFormeFeuille
};

export default FormeFeuilleController;