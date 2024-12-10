import { Request, Response } from 'express';
import OrigineModel from '../models/origineModel';

// Récupérer tous les Arrosages
export const getAllOrigines = async (req: Request, res: Response): Promise<void> => {
    try {
        const origines = await OrigineModel.find();

        if( origines.length == 0)
        {
            res.status(404).json({ message: "Aucune origine trouvée"});
            return;
        }

        res.status(200).json(origines);        
    } catch (error) {
        if (error instanceof Error) {           
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des origines' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue' });
        }
    }
};

// Récupérer Arrosage par ID
export const getOrigineById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        
        const morphologie = await OrigineModel.findById(id);

        if (!morphologie) {
            res.status(404).json({ message: 'Origine non trouvée' });
            return;
        }
        
        res.status(200).json(morphologie);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de l'origine" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de l'origine" });
        }
    }
}


const OrigineController = {
    getAllOrigines,
    getOrigineById
};

export default OrigineController;