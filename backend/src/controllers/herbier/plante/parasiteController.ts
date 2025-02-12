import { Request, Response } from 'express';
import ParasiteModel from '../../../models/herbier/plante/parasiteModel';

// Récupérer tous les Parasites
export const getAllParasites = async (req: Request, res: Response): Promise<void> => {
    try {
        const parasites = await ParasiteModel.find();

        if( parasites.length == 0)
        {
            res.status(404).json({ message: "Aucun parasite trouvé"});
            return;
        }

        res.status(200).json(parasites);        
    } catch (error) {
        if (error instanceof Error) {           
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des parasites' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue' });
        }
    }
};

// Récupérer un parasite par son ID
export const getParasiteById = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.params;

    try {
        
        const parasite = await ParasiteModel.findById(id);

        if (!parasite) {
            res.status(404).json({ message: 'Parasite non trouvé' });
            return;
        }
        
        res.status(200).json(parasite);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération du parasite" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération du parasite" });
        }
    }
}


// Créer une nouveau parasite
export const createParasite = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nom, description } = req.body;

        if (!nom || !description) {
            res.status(400).json({ message: 'Les champs "nom" et "description" sont requis.' });
            return;
        }


        const existingParasite = await ParasiteModel.findOne({ nom });

        if (existingParasite) {
            res.status(409).json({ message: "Un parasite avec ce nom existe déjà." });
            return;
        }

        const nouveauParasite = new ParasiteModel({ nom, description });
        const saveParasite = await nouveauParasite.save();

        res.status(201).json(saveParasite);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création du parasite" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création du parasite" });
        }
    }
};


// Mettre à jour un parasite par ID
export const updateParasite = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nom, description } = req.body;

    try {
        const updatedParasite = await ParasiteModel.findByIdAndUpdate(id, { nom, description }, { new: true });

        if (!updatedParasite) {
            res.status(404).json({ message: "Parasite non trouvé" });
            return;
        }

        res.status(200).json(updatedParasite);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la mise à jour du parasite" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la mise à jour du parasite" });
        }
    }
};

// Supprimer un parasite par ID
export const deleteParasite = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const parasite = await ParasiteModel.findByIdAndDelete(id);

        if (!parasite) {
            res.status(404).json({ message: "Parasite non trouvé" });
            return;
        }

        res.status(200).json({ message: "Parasite supprimé avec succès" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la suppression du parasite" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la suppression du parasite" });
        }
    }
};


const ParasiteController = {
    getAllParasites,
    getParasiteById,
    createParasite,
    updateParasite,
    deleteParasite,
};

export default ParasiteController;