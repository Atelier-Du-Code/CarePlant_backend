import { Request, Response } from 'express';
import EspeceModel from '../models/especeModel';


// Récupérer toutes les espèces
export const getAllEspeces = async (req: Request, res: Response): Promise<void> => {
    try {
        const especes = await EspeceModel.find();

        if( especes.length == 0)
        {
            res.status(404).json({ message: "Aucune espèce trouvée"});
            return;
        }

        res.status(200).json(especes);        
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des besoins' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération des espèces' });
        }
    }
};


// Récupérer une espèce par ID
export const getEspeceById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        
        const espece = await EspeceModel.findById(id);

        if (!espece) {
            res.status(404).json({ message: 'Espèce non trouvée' });
            return;
        }
        
        res.status(200).json(espece);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de l'espèce" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de l'espèce" });
        }
    }
}


const especeController = {
    getAllEspeces,
    getEspeceById
};

export default especeController;