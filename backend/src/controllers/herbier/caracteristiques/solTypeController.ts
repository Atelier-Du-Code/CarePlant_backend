import { Request, Response } from 'express';
import solTypeModel from '../../../models/herbier/plante/besoin/solTypeModel';

// Récupérer tous les solTypes
export const getAllSolTypes = async (req: Request, res: Response): Promise<void> => {
    try {
        const solTypes = await solTypeModel.find();

        if (solTypes.length == 0) {
            res.status(404).json({ message: "Aucun solType trouvé" });
            return;
        }

        res.status(200).json(solTypes);
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des solTypes' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue' });
        }
    }
};

// Récupérer un solType par son ID
export const getSolTypeById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const solType = await solTypeModel.findById(id);

        if (!solType) {
            res.status(404).json({ message: 'solType non trouvé' });
            return;
        }

        res.status(200).json(solType);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération du solType" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération du solType" });
        }
    }
};

// Créer un nouveau type de sol
export const createTypeSol = async (req: Request, res: Response): Promise<void> => {
    try {
        const { type, description } = req.body;

        if (!type || !description) {
            res.status(400).json({ message: 'Les champs "type" et "description" sont requis.' });
            return;
        }


        const existingOrigine = await solTypeModel.findOne({ type });

        if (existingOrigine) {
            res.status(409).json({ message: "Une origine avec ce nom existe déjà." });
            return;
        }

        const nouveauSolType = new solTypeModel({ type, description });
        const saveSolType = await nouveauSolType.save();

        res.status(200).json(saveSolType);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création du type de sol" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création du type de sol" });
        }
    }
};

// Mettre à jour un type de sol
export const updateSolType = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { type, description } = req.body;

    try {
        const updatedSolType = await solTypeModel.findByIdAndUpdate(id, { type, description }, { new: true });

        if (!updatedSolType) {
            res.status(404).json({ message: "SolType non trouvé" });
            return;
        }

        res.status(200).json(updatedSolType);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du type de sol" });
    }
};

// Supprimer un type de sol
export const deleteSolType = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedSolType = await solTypeModel.findByIdAndDelete(id);

        if (!deletedSolType) {
            res.status(404).json({ message: "SolType non trouvé" });
            return;
        }

        res.status(200).json({ message: "SolType supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du type de sol" });
    }
};

const SolTypeController = {
    getAllSolTypes,
    getSolTypeById,
    createTypeSol,
    updateSolType,
    deleteSolType
};

export default SolTypeController;
