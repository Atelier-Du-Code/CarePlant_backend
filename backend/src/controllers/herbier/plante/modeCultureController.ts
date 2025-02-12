import { Request, Response } from 'express';
import ModeCultureModel from '../../../models/herbier/plante/modeCultureModel';

// Récupérer tous les modes de culture
export const getAllModesCulture = async (req: Request, res: Response): Promise<void> => {
    try {
        const modes = await ModeCultureModel.find();

        if (modes.length == 0) {
            res.status(404).json({ message: "Aucun mode trouvé" });
            return;
        }

        res.status(200).json(modes);
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des modes de culture' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue' });
        }
    }
};

// Récupérer un mode de culture par ID
export const getModeCultureById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const mode = await ModeCultureModel.findById(id);

        if (!mode) {
            res.status(404).json({ message: 'Mode de culture non trouvé' });
            return;
        }

        res.status(200).json(mode);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération du mode de culture" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération du mode de culture" });
        }
    }
};

// Créer un nouveau mode de culture
export const createModeCulture = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nom, description } = req.body;

        if (!nom || !description) {
            res.status(400).json({ message: 'Les champs "nom" et "description" sont requis.' });
            return;
        }


        const existingMode = await ModeCultureModel.findOne({ nom });

        if (existingMode) {
            res.status(409).json({ message: "Un mode de culture avec ce nom existe déjà." });
            return;
        }

        const nouveaMode = new ModeCultureModel({ nom, description });
        const saveMode = await nouveaMode.save();

        res.status(201).json(saveMode);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création du mode de culture" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création du mode de culture" });
        }
    }
};

// Supprimer un mode de culture
export const deleteModeCulture = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const mode = await ModeCultureModel.findByIdAndDelete(id);

        if (!mode) {
            res.status(404).json({ message: "Mode non trouvé" });
            return;
        }

        res.status(200).json({ message: "Mode de culture supprimée avec succès" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la suppression du m" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la suppression de l'origine" });
        }
    }
};

const ModeCultureController = {
    getAllModesCulture,
    getModeCultureById,
    createModeCulture,
    deleteModeCulture,
};

export default ModeCultureController;
