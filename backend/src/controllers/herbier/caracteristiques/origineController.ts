import { Request, Response } from 'express';
import OrigineModel from '../../../models/herbier/caracteristiques/Autre/origineModel';

// Récupérer toutes les origines
export const getAllOrigines = async (req: Request, res: Response): Promise<void> => {
    try {
        const origines = await OrigineModel.find();

        if (origines.length == 0) {
            res.status(404).json({ message: "Aucune origine trouvée" });
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

// Récupérer une origine par ID
export const getOrigineById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const origine = await OrigineModel.findById(id);

        if (!origine) {
            res.status(404).json({ message: 'Origine non trouvée' });
            return;
        }

        res.status(200).json(origine);
    } catch (error: unknown) {
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
};

// Créer une nouvelle origine
export const createOrigine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nom, description } = req.body;

        if (!nom || !description) {
            res.status(400).json({ message: 'Les champs "nom" et "description" sont requis.' });
            return;
        }


        const existingOrigine = await OrigineModel.findOne({ nom });

        if (existingOrigine) {
            res.status(409).json({ message: "Une origine avec ce nom existe déjà." });
            return;
        }

        const nouvelleOrigine = new OrigineModel({ nom, description });
        const saveOrigine = await nouvelleOrigine.save();

        res.status(201).json(saveOrigine);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création de l'origine" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de l'origine" });
        }
    }
};

// Mettre à jour une origine par ID
export const updateOrigine = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nom, description } = req.body;

    try {
        const updatedOrigine = await OrigineModel.findByIdAndUpdate(id, { nom, description }, { new: true });

        if (!updatedOrigine) {
            res.status(404).json({ message: "Origine non trouvée" });
            return;
        }

        res.status(200).json(updatedOrigine);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la mise à jour de l'origine" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la mise à jour de l'origine" });
        }
    }
};

// Supprimer une origine par ID
export const deleteOrigine = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const origine = await OrigineModel.findByIdAndDelete(id);

        if (!origine) {
            res.status(404).json({ message: "Origine non trouvée" });
            return;
        }

        res.status(200).json({ message: "Origine supprimée avec succès" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la suppression de l'origine" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la suppression de l'origine" });
        }
    }
};

const OrigineController = {
    getAllOrigines,
    getOrigineById,
    createOrigine,
    updateOrigine,
    deleteOrigine,
};

export default OrigineController;
