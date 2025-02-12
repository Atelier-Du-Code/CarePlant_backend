import { Request, Response } from 'express';
import CroissanceModel from '../../../../models/herbier/caracteristiques/morphologie/croissanceModel';

// Récupérer toutes les Croissances
export const getAllCroissances = async (req: Request, res: Response): Promise<void> => {
    try {
        const croissances = await CroissanceModel.find();

        if (croissances.length === 0) {
            res.status(404).json({ message: "Aucune croissance trouvée" });
            return;
        }

        res.status(200).json(croissances);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération des croissances' });
        }
    }
};

// Récupérer une croissance par ID
export const getCroissanceById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const croissance = await CroissanceModel.findById(id);
        if (!croissance) {
            res.status(404).json({ message: 'Croissance non trouvée' });
            return;
        }
        res.status(200).json(croissance);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de la croissance" });
        }
    }
};

// Créer une nouvelle croissance
export const createCroissance = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nom, description } = req.body;
        if (!nom || !description) {
            res.status(400).json({ message: 'Les champs "nom" et "description" sont requis.' });
            return;
        }


        const existingCroissance = await CroissanceModel.findOne({ nom });

        if (existingCroissance) {
            res.status(409).json({ message: "Une croissance avec ce nom existe déjà." });
            return;
        }


        const nouvelleCroissance = new CroissanceModel({ nom, description });
        const saveCroissance = await nouvelleCroissance.save();
        res.status(201).json(saveCroissance);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de la croissance" });
        }
    }
};

// Mettre à jour une croissance
export const updateCroissance = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nom, description } = req.body;

    try {
        const updatedCroissance = await CroissanceModel.findByIdAndUpdate(id, { nom, description }, { new: true });
        if (!updatedCroissance) {
            res.status(404).json({ message: 'Croissance non trouvée' });
            return;
        }
        res.status(200).json(updatedCroissance);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la mise à jour de la croissance" });
        }
    }
};

// Supprimer une croissance
export const deleteCroissance = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedCroissance = await CroissanceModel.findByIdAndDelete(id);
        if (!deletedCroissance) {
            res.status(404).json({ message: 'Croissance non trouvée' });
            return;
        }
        res.status(200).json({ message: 'Croissance supprimée avec succès' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la suppression de la croissance" });
        }
    }
};

const CroissanceController = {
    getAllCroissances,
    getCroissanceById,
    createCroissance,
    updateCroissance,
    deleteCroissance
};

export default CroissanceController;
