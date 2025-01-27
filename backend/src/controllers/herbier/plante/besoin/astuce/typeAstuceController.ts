import { Request, Response } from 'express';
import AstuceTypeModel from '../../../../../models/herbier/plante/besoin/astuce/typeAstuceModel';


// Récupérer toutes les astuces
export const getAllTypesAstuce = async (req: Request, res: Response): Promise<void> => {
    try {
        const typesAstuce = await AstuceTypeModel.find();

        if( typesAstuce.length == 0)
        {
            res.status(404).json({ message: "Aucun type d'astuce trouvé"});
            return;
        }

        res.status(200).json(typesAstuce);        
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération des types d'astuce" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération des types d'astuce" });
        }
    }
};


// Récupérer une astuce par ID
export const getTypeAstuceById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        
        const typeAstuce = await AstuceTypeModel.findById(id);

        if (!typeAstuce) {
            res.status(404).json({ message: "Type d'astuce non trouvé" });
            return;
        }
        
        res.status(200).json(typeAstuce);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération du type de l'astuce" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération du type de l'astuce" });
        }
    }
}


export const createTypeAstuce = async (req: Request, res: Response): Promise<void> => {
    
    try {
        
        const { nom } = req.body;

        if (!nom) {
           res.status(400).json({ message: 'Le champ "nom" est requis.' });
           return;
        }
        
        const nouveauType = new AstuceTypeModel({nom});
        const saveType  = await nouveauType.save();

        res.status(200).json(saveType);

    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création du type de l'astuce" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création du type de l'astuce" });
        }
    }
}


const TypeAstuceController = {
    getAllTypesAstuce,
    getTypeAstuceById,
    createTypeAstuce
};

export default TypeAstuceController;