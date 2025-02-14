import { Request, Response } from 'express';
import ArrosageModel from '../models/arrosageModel';


// Récupérer tous les Arrosages
export const getAllArrosages = async (req: Request, res: Response): Promise<void> => {
    try {
        const arrosages = await ArrosageModel.find();

        if( arrosages.length == 0)
        {
            res.status(404).json({ message: "Aucun arrosage trouvé"});
            return;
        }

        res.status(200).json(arrosages);        
    } catch (error) {
        if (error instanceof Error) {
            // Vérification de l'erreur MongoDB
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des arrosages' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue' });
        }
    }
};

// Récupérer Arrosage par ID
export const getArrosageById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        
        const arrosage = await ArrosageModel.findById(id);

        if (!arrosage) {
            res.status(404).json({ message: 'Arrosage non trouvé' });
            return;
        }
        
        res.status(200).json(arrosage);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération de l\'arrosage' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération de l\'arrosage' });
        }
    }
}


const arrosageController = {
    getAllArrosages,
    getArrosageById
};

export default arrosageController;