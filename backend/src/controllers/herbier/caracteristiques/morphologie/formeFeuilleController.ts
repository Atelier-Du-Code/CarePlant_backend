import { Request, Response } from 'express';
import FormeFeuilleModel from '../../../../models/herbier/caracteristiques/morphologie/formeFeuilleModel';

// Récupérer toutes les formes de feuille
export const getAllFormeFeuilles = async (req: Request, res: Response): Promise<void> => {
    try {
        const formeFeuilles = await FormeFeuilleModel.find();

        if (formeFeuilles.length === 0) {
            res.status(404).json({ message: "Aucune forme de feuille trouvée" });
            return;
        }

        res.status(200).json(formeFeuilles);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des formes de feuille' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération des formes de feuille' });
        }
    }
};

// Récupérer une FormeFeuille par ID
export const getFormeFeuilleById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const formeFeuille = await FormeFeuilleModel.findById(id);

        if (!formeFeuille) {
            res.status(404).json({ message: 'Forme de feuille non trouvée' });
            return;
        }

        res.status(200).json(formeFeuille);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de la forme de feuille" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de la forme de feuille" });
        }
    }
};

// Créer une nouvelle FormeFeuille
export const createFormeFeuille = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nom, description } = req.body;

        if (!nom || !description) {
            res.status(400).json({ message: 'Les champs "nom" et "description" sont requis.' });
            return;
        }
        
        const existingForme = await FormeFeuilleModel.findOne({ nom });

        if (existingForme) {
            res.status(409).json({ message: "Une forme de feuille avec ce nom existe déjà." });
            return;
        }

        const nouvelleFormeFeuille = new FormeFeuilleModel({ nom, description });
        const saveFormeFeuille = await nouvelleFormeFeuille.save();

        res.status(201).json(saveFormeFeuille);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création de la FormeFeuille" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de la FormeFeuille" });
        }
    }
};

// Mettre à jour une FormeFeuille par ID
export const updateFormeFeuille = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nom, description } = req.body;

    try {
        const updatedFormeFeuille = await FormeFeuilleModel.findByIdAndUpdate(id, { nom, description }, { new: true });

        if (!updatedFormeFeuille) {
            res.status(404).json({ message: "Forme de feuille non trouvée" });
            return;
        }

        res.status(200).json(updatedFormeFeuille);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la mise à jour de la FormeFeuille" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la mise à jour de la FormeFeuille" });
        }
    }
};

// Supprimer une FormeFeuille par ID
export const deleteFormeFeuille = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedFormeFeuille = await FormeFeuilleModel.findByIdAndDelete(id);

        if (!deletedFormeFeuille) {
            res.status(404).json({ message: "Forme de feuille non trouvée" });
            return;
        }

        res.status(200).json({ message: "Forme de feuille supprimée avec succès" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la suppression de la FormeFeuille" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la suppression de la FormeFeuille" });
        }
    }
};

const FormeFeuilleController = {
    getAllFormeFeuilles,
    getFormeFeuilleById,
    createFormeFeuille,
    updateFormeFeuille,
    deleteFormeFeuille
};

export default FormeFeuilleController;
