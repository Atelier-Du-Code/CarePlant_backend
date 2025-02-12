import { Request, Response } from 'express';
import EmplacementModel from '../../../models/herbier/plante/emplacementModel';

// Récupérer tous les emplacements
export const getAllEmplacements = async (req: Request, res: Response): Promise<void> => {
    try {
        const emplacements = await EmplacementModel.find();

        if (emplacements.length == 0) {
            res.status(404).json({ message: "Aucun emplacement trouvé" });
            return;
        }

        res.status(200).json(emplacements);
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des emplacements' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue' });
        }
    }
};

// Récupérer un emplacement par ID
export const getEmplacementById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const emplacement = await EmplacementModel.findById(id);

        if (!emplacement) {
            res.status(404).json({ message: 'Emplacement non trouvé' });
            return;
        }

        res.status(200).json(emplacement);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de l'emplacement" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de l'emplacement" });
        }
    }
};

// Créer une nouvelle origine
export const createEmplacement = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nom, description } = req.body;

        if (!nom || !description) {
            res.status(400).json({ message: 'Les champs "nom" et "description" sont requis.' });
            return;
        }


        const existingEmplacement = await EmplacementModel.findOne({ nom });

        if (existingEmplacement) {
            res.status(409).json({ message: "Un emplacement avec ce nom existe déjà." });
            return;
        }

        const nouvelEmplacement = new EmplacementModel({ nom, description });
        const saveEmplacement = await nouvelEmplacement.save();

        res.status(201).json(saveEmplacement);

    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création de l'emplacement" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de l'emplacement" });
        }
    }
};

// Mettre à jour un emplacement par ID
export const updateEmplacement = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nom, description } = req.body;

    try {
        const updatedEmplacement = await EmplacementModel.findByIdAndUpdate(id, { nom, description }, { new: true });

        if (!updatedEmplacement) {
            res.status(404).json({ message: "Emplacement non trouvé" });
            return;
        }

        res.status(200).json(updatedEmplacement);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la mise à jour de l'emplacement" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la mise à jour de l'emplacement" });
        }
    }
};

// Supprimer une origine par ID
export const deleteEmplacement = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const emplacement = await EmplacementModel.findByIdAndDelete(id);

        if (!emplacement) {
            res.status(404).json({ message: "Emplacement non trouvé" });
            return;
        }

        res.status(200).json({ message: "Emplacement supprimé avec succès" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la suppression de l'emplacement" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la suppression de l'emplacement" });
        }
    }
};

const EmplacementController = {
    getAllEmplacements,
    getEmplacementById,
    createEmplacement,
    updateEmplacement,
    deleteEmplacement,
};

export default EmplacementController;
