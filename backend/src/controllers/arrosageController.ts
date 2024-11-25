import { Request, Response } from 'express';
import ArrosageModel from '../models/arrosageModel';  // Assurez-vous que le chemin d'importation est correct

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
export const getArrosageById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const arrosage = await ArrosageModel.findById(id);
        if (!arrosage) {
            return res.status(404).json({ message: 'Arrosage non trouvé' });
        }

        res.status(200).json(arrosage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'arrosage' });
    }
};

export default {
    getAllArrosages,
    getArrosageById
}