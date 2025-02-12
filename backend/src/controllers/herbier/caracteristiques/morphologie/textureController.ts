import { Request, Response } from 'express';
import TextureModel from '../../../../models/herbier/caracteristiques/morphologie/textureModel';

// Récupérer toutes les textures
export const getAllTextures = async (req: Request, res: Response): Promise<void> => {
    try {
        const textures = await TextureModel.find();

        if (textures.length === 0) {
            res.status(404).json({ message: "Aucune texture trouvée" });
            return;
        }

        res.status(200).json(textures);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des textures' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération des textures' });
        }
    }
};

// Récupérer une texture par ID
export const getTextureById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const texture = await TextureModel.findById(id);

        if (!texture) {
            res.status(404).json({ message: 'Texture non trouvée' });
            return;
        }

        res.status(200).json(texture);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de la texture" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de la texture" });
        }
    }
};

// Créer une nouvelle texture
export const createTexture = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nom, description } = req.body;

        if (!nom || !description) {
            res.status(400).json({ message: 'Les champs "nom" et "description" sont requis.' });
            return;
        }

        const existingTexture = await TextureModel.findOne({ nom });

        if (existingTexture) {
            res.status(409).json({ message: "Cette texture existe déjà." });
            return;
        }

        const nouvelleTexture = new TextureModel({ nom, description });
        const saveTexture = await nouvelleTexture.save();

        res.status(201).json(saveTexture);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création de la texture" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de la texture" });
        }
    }
};

// Mettre à jour une texture
export const updateTexture = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nom, description } = req.body;

    try {
        const updatedTexture = await TextureModel.findByIdAndUpdate(
            id,
            { nom, description },
            { new: true, runValidators: true }
        );

        if (!updatedTexture) {
            res.status(404).json({ message: "Texture non trouvée" });
            return;
        }

        res.status(200).json(updatedTexture);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la mise à jour de la texture" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la mise à jour de la texture" });
        }
    }
};

// Supprimer une texture
export const deleteTexture = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedTexture = await TextureModel.findByIdAndDelete(id);

        if (!deletedTexture) {
            res.status(404).json({ message: "Texture non trouvée" });
            return;
        }

        res.status(200).json({ message: "Texture supprimée avec succès" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la suppression de la texture" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la suppression de la texture" });
        }
    }
};

const TextureController = {
    getAllTextures,
    getTextureById,
    createTexture,
    updateTexture,
    deleteTexture
};

export default TextureController;
