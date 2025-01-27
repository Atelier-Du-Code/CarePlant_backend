import { Request, Response } from 'express';
import AstuceModel from '../../../../../models/herbier/plante/besoin/astuce/astuceModel';


// Récupérer toutes les astuces
export const getAllAstuces = async (req: Request, res: Response): Promise<void> => {
    try {
        const astuces = await AstuceModel.find();

        if( astuces.length == 0)
        {
            res.status(404).json({ message: "Aucune astuce trouvée"});
            return;
        }

        res.status(200).json(astuces);        
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des astuces' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération des astuces' });
        }
    }
};


// Récupérer une astuce par ID
export const getAstuceById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        
        const astuce = await AstuceModel.findById(id);

        if (!astuce) {
            res.status(404).json({ message: 'Astuce non trouvée' });
            return;
        }
        
        res.status(200).json(astuce);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de l'astuce" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de l'astuce" });
        }
    }
}


export const createAstuce = async (req: Request, res: Response): Promise<void> => {
    
    try {
        
        const { idTypeAstuce, nom, description } = req.body;

        if (!idTypeAstuce || !nom || !description) {
           res.status(400).json({ message: 'Les champs "idTypeAstuce", "nom" et "description" sont requis.' });
           return;
        }
        
        const nouvelleAstuce = new AstuceModel({idTypeAstuce, nom, description});
        const saveAstuce  = await nouvelleAstuce.save();

        res.status(200).json(saveAstuce );

    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création de l'astuce" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de l'astuce" });
        }
    }
}


const AstuceController = {
    getAllAstuces,
    getAstuceById,
    createAstuce
};

export default AstuceController;