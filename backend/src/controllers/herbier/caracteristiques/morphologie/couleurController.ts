import { Request, Response } from 'express';
import CouleurModel from '../../../../models/herbier/caracteristiques/morphologie/couleurModel';

// Récupérer toutes les couleurs
export const getAllCouleurs = async (req: Request, res: Response): Promise<void> => {
    try {
        const couleurs = await CouleurModel.find();

        if( couleurs.length == 0)
        {
            res.status(404).json({ message: "Aucune couleur trouvée"});
            return;
        }

        res.status(200).json(couleurs);        
    } catch (error:unknown) {
        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des couleurs' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération des couleurs' });
        }
    }
};

// Récupérer une couleur par ID
export const getCouleurById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const couleur = await CouleurModel.findById(id);
        if (!couleur) {
            res.status(404).json({ message: 'couleur non trouvée' });
            return;
        }
        res.status(200).json(couleur);
    } catch (error:unknown) {
        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de la couleur" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de la couleur" });
        }
    }
};

// Créer une couleur
export const createCouleur = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nom, description } = req.body;
        if (!nom || !description) {
           res.status(400).json({ message: 'Les champs "nom" et "description" sont requis.' });
           return;
        }


        const existingCouleur = await CouleurModel.findOne({ nom });

        if (existingCouleur) {
            res.status(409).json({ message: "Une couleur avec ce nom existe déjà." });
            return;
        }


        const nouvelleCouleur = new CouleurModel({nom, description});
        const saveCouleur = await nouvelleCouleur.save();
        res.status(200).json(saveCouleur);
    } catch (error:unknown) {
        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création de la couleur" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de la couleur" });
        }
    }
};

// Mettre à jour une couleur
export const updateCouleur = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nom, description } = req.body;
    try {
        const couleur = await CouleurModel.findByIdAndUpdate(id, { nom, description }, { new: true });
        if (!couleur) {
            res.status(404).json({ message: 'Couleur non trouvée' });
            return;
        }
        res.status(200).json(couleur);
    } catch (error: unknown) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la couleur' });
    }
};

// Supprimer une couleur
export const deleteCouleur = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const couleur = await CouleurModel.findByIdAndDelete(id);
        if (!couleur) {
            res.status(404).json({ message: 'Couleur non trouvée' });
            return;
        }
        res.status(200).json({ message: 'Couleur supprimée avec succès' });
    } catch (error: unknown) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la couleur' });
    }
};

const CouleurController = {
    getAllCouleurs,
    getCouleurById,
    createCouleur,
    updateCouleur,
    deleteCouleur,
};

export default CouleurController;
