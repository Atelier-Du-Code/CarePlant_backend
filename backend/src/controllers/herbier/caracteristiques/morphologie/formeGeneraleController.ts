import { Request, Response } from 'express';
import FormeGeneraleModel from '../../../../models/herbier/caracteristiques/morphologie/formeGeneraleModel';

// Récupérer toutes les formes générales
export const getAllFormesGenerale = async (req: Request, res: Response): Promise<void> => {
    try {
        const formes = await FormeGeneraleModel.find();

        if (formes.length === 0) {
            res.status(404).json({ message: "Aucune forme trouvée" });
            return;
        }

        res.status(200).json(formes);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des formes' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération des formes' });
        }
    }
};

// Récupérer une forme par ID
export const getFormeGeneraleById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const forme = await FormeGeneraleModel.findById(id);

        if (!forme) {
            res.status(404).json({ message: 'Forme non trouvée' });
            return;
        }

        res.status(200).json(forme);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de la forme générale" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de la forme générale" });
        }
    }
};

// Créer une nouvelle forme générale
export const createFormeGenerale = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nom, description } = req.body;

        if (!nom || !description) {
            res.status(400).json({ message: 'Les champs "nom" et "description" sont requis.' });
            return;
        }


        const existingForme = await FormeGeneraleModel.findOne({ nom });

        if (existingForme) {
            res.status(409).json({ message: "Une forme générale avec ce nom existe déjà." });
            return;
        }


        const nouvelleForme = new FormeGeneraleModel({ nom, description });
        const saveForme = await nouvelleForme.save();

        res.status(201).json(saveForme);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création de la forme générale" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de la forme générale" });
        }
    }
};

// Mettre à jour une forme générale
export const updateFormeGenerale = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nom, description } = req.body;

    try {
        const updatedForme = await FormeGeneraleModel.findByIdAndUpdate(
            id,
            { nom, description },
            { new: true, runValidators: true }
        );

        if (!updatedForme) {
            res.status(404).json({ message: "Forme non trouvée" });
            return;
        }

        res.status(200).json(updatedForme);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la mise à jour de la forme générale" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la mise à jour de la forme générale" });
        }
    }
};

// Supprimer une forme générale
export const deleteFormeGenerale = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedForme = await FormeGeneraleModel.findByIdAndDelete(id);

        if (!deletedForme) {
            res.status(404).json({ message: "Forme non trouvée" });
            return;
        }

        res.status(200).json({ message: "Forme supprimée avec succès" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la suppression de la forme générale" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la suppression de la forme générale" });
        }
    }
};

const FormeGeneraleController = {
    getAllFormesGenerale,
    getFormeGeneraleById,
    createFormeGenerale,
    updateFormeGenerale,
    deleteFormeGenerale
};

export default FormeGeneraleController;
