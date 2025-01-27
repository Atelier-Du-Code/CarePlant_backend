import { Request, Response } from 'express';
import FrequenceArrosageModel from '../../../../../models/herbier/plante/besoin/arrosage/frequenceArrosageModel';


// Récupérer toutes les fréquences d'arrosage
export const getAllFrequencesArrosage = async (req: Request, res: Response): Promise<void> => {
    try {
        const frequencesArrosage = await FrequenceArrosageModel.find();

        if( frequencesArrosage.length == 0)
        {
            res.status(404).json({ message: "Aucune frequence d'arrosage trouvée"});
            return;
        }

        res.status(200).json(frequencesArrosage);        
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération des fréquence d'arrosage" });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération des fréquences' });
        }
    }
};


// Récupérer une fréquence d'arrosage par ID
export const getFrequenceArrosageById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        
        const frequenceArrosage = await FrequenceArrosageModel.findById(id);

        if (!frequenceArrosage) {
            res.status(404).json({ message: "Fréquence d'arrosage non trouvée" });
            return;
        }
        
        res.status(200).json(frequenceArrosage);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de la fréquence d'arrosage" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de la fréquence d'arrosage" });
        }
    }
}


export const createFrequenceArrosage = async (req: Request, res: Response): Promise<void> => {
    
    try {
        
        const { nbJours, libelle } = req.body;

        if (!nbJours || !libelle) {
           res.status(400).json({ message: 'Les champs "nbJours" et "libelle" sont requis.' });
           return;
        }
        
        const nouvelleFrequence = new FrequenceArrosageModel({nbJours, libelle});
        const saveFrequence = await nouvelleFrequence.save();

        res.status(200).json(saveFrequence);

    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données'});
            } else {
                res.status(500).json({ message: "Erreur lors de la création de la fréquence d'arrosage"});
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de la fréquence d'arrosage"});
        }
    }
}


const FrequenceArrosageController = {
    getAllFrequencesArrosage,
    getFrequenceArrosageById,
    createFrequenceArrosage
};

export default FrequenceArrosageController;