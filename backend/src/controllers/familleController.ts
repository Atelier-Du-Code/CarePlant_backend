import { Request, Response } from 'express';
import FamilleModel from '../models/familleModel';


// Récupérer toutes les familles
export const getAllFamille = async (req: Request, res: Response): Promise<void> => {
    try {
        const familles = await FamilleModel.find();

        if( familles.length == 0)
        {
            res.status(404).json({ message: "Aucune famille trouvée"});
            return;
        }

        res.status(200).json(familles);        
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des familles' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération des familles' });
        }
    }
};


// Récupérer une famille par ID
export const getFamilleById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        
        const famille = await FamilleModel.findById(id);

        if (!famille) {
            res.status(404).json({ message: 'Famille non trouvée' });
            return;
        }
        
        res.status(200).json(famille);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération de la famille' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération de la famille' });
        }
    }
}


const familleController = {
    getAllFamille,
    getFamilleById
};

export default familleController;