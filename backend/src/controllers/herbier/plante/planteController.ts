import { Request, Response } from 'express';
import PlanteModel from '../../../models/herbier/plante/planteModel';


export const getAllPlantes = async (req: Request, res: Response): Promise<void> => {
    try {
        const plantes = await PlanteModel.find({});
        res.status(200).json(plantes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des plantes', error });
    }
};

/*
// Récupérer toutes les plantes
export const getAllPlantes = async (req: Request, res: Response): Promise<void> => {
    try {
        const plantes = await PlanteModel.find();

        if( plantes.length == 0)
        {
            res.status(404).json({ message: "Aucune plante trouvée"});
            return;
        }

        res.status(200).json(plantes);        
    } catch (error) {
        if (error instanceof Error) {           
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des plantes' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue' });
        }
    }
};
*/
// Récupérer une plante par son ID
export const getPlanteById = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.params;

    try {
        
        const plante = await PlanteModel.findById(id);

        if (!plante) {
            res.status(404).json({ message: 'Plante non trouvé' });
            return;
        }
        
        res.status(200).json(plante);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de la plante" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération du parasite" });
        }
    }
}


const ParasiteController = {
    getAllPlantes,
    getPlanteById
};

export default ParasiteController;