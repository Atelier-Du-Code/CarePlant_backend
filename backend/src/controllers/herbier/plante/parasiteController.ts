import { Request, Response } from 'express';
import ParasiteModel from '../../../models/herbier/plante/parasiteModel';

// Récupérer tous les Parasites
export const getAllParasites = async (req: Request, res: Response): Promise<void> => {
    try {
        const parasites = await ParasiteModel.find();

        if( parasites.length == 0)
        {
            res.status(404).json({ message: "Aucun parasite trouvé"});
            return;
        }

        res.status(200).json(parasites);        
    } catch (error) {
        if (error instanceof Error) {           
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des parasites' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue' });
        }
    }
};

// Récupérer un parasite par son ID
export const getParasiteById = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.params;

    try {
        
        const parasite = await ParasiteModel.findById(id);

        if (!parasite) {
            res.status(404).json({ message: 'Parasite non trouvé' });
            return;
        }
        
        res.status(200).json(parasite);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération du parasite" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération du parasite" });
        }
    }
}


const ParasiteController = {
    getAllParasites,
    getParasiteById
};

export default ParasiteController;