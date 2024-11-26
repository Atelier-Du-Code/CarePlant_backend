import { Request, Response } from 'express';
import ArrosageModel from '../models/arrosageModel';

// Récupérer tous les Arrosages
export const getAllArrosages = async (req: Request, res: Response) => {
    try {
        const arrosages = await ArrosageModel.find();
        res.status(200).json(arrosages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des arrosages' });
    }
};

// Récupérer Arrosage par ID
export const getArrosageById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        // Recherche de l'arrosage par ID
        const arrosage = await ArrosageModel.findById(id);

        // Vérification si l'arrosage existe
        if (!arrosage) {
            res.status(404).json({ message: 'Arrosage non trouvé' });
            return;
        }

        // Envoi de la réponse si l'arrosage est trouvé
        res.status(200).json(arrosage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération de l'arrosage" });
    }
}


const arrosageController = {
    getAllArrosages,
    getArrosageById
};

export default arrosageController;