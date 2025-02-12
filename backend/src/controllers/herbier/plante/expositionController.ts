import { Request, Response } from 'express';
import ExpositionModel from '../../../models/herbier/plante/besoin/expositionModel';

// Récupérer toutes les expositions
export const getAllExpositions = async (req: Request, res: Response): Promise<void> => {
    try {
        const expositions = await ExpositionModel.find();

        if (expositions.length == 0) {
            res.status(404).json({ message: "Aucune exposition trouvée" });
            return;
        }

        res.status(200).json(expositions);
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des expositions' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue' });
        }
    }
};

// Récupérer une exposition par ID
export const getExpositionById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const exposition = await ExpositionModel.findById(id);

        if (!exposition) {
            res.status(404).json({ message: 'Exposition non trouvée' });
            return;
        }

        res.status(200).json(exposition);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de l'exposition" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de l'exposition" });
        }
    }
};

// Créer une nouvelle exposition
export const createExposition = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nom, description } = req.body;

        if (!nom || !description) {
            res.status(400).json({ message: 'Les champs "nom" et "description" sont requis.' });
            return;
        }


        const existingExposition = await ExpositionModel.findOne({ nom });

        if (existingExposition) {
            res.status(409).json({ message: "Une exposition avec ce nom existe déjà." });
            return;
        }

        const nouvelleExposition = new ExpositionModel({ nom, description });
        const saveExposition = await nouvelleExposition.save();

        res.status(201).json(saveExposition);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création de l'exposition" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de l'origiexpositionne" });
        }
    }
};

// Mettre à jour une exposition par ID
export const updateExposition = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nom, description } = req.body;

    try {
        const updatedExposition = await ExpositionModel.findByIdAndUpdate(id, { nom, description }, { new: true });

        if (!updatedExposition) {
            res.status(404).json({ message: "Exposition non trouvée" });
            return;
        }

        res.status(200).json(updatedExposition);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la mise à jour de l'exposition" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la mise à jour de l'exposition" });
        }
    }
};

// Supprimer une exposition par ID
export const deleteExposition = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const exposition = await ExpositionModel.findByIdAndDelete(id);

        if (!exposition) {
            res.status(404).json({ message: "Exposition non trouvée" });
            return;
        }

        res.status(200).json({ message: "Exposition supprimée avec succès" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la suppression de l'exposition" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la suppression de l'exposition" });
        }
    }
};

const ExpositionController = {
    getAllExpositions,
    getExpositionById,
    createExposition,
    updateExposition,
    deleteExposition,
};

export default ExpositionController;
