import { Request, Response } from 'express';
import CroissanceModel from '../../../../models/herbier/caracteristiques/morphologie/croissanceModel';


// Récupérer toutes les Croissances
export const getAllCroissances = async (req: Request, res: Response): Promise<void> => {
    try {
        const croissances = await CroissanceModel.find();

        if( croissances.length == 0)
        {
            res.status(404).json({ message: "Aucune croissance trouvée"});
            return;
        }

        res.status(200).json(croissances);        
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des croissances' });
            }
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
            res.status(404).json({ message: 'croissance non trouvée' });
            return;
        }
        
        res.status(200).json(croissance);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de la croissance" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de la croissance" });
        }
    }
}


export const createCroissance = async (req: Request, res: Response): Promise<void> => {
    
    try {
        
        const { nom, description } = req.body;

        if (!nom || !description) {
           res.status(400).json({ message: 'Les champs "nom" et "description" sont requis.' });
           return;
        }
        
        const nouvelleCroissance = new CroissanceModel({nom, description});
        const saveCroissance  = await nouvelleCroissance.save();

        res.status(200).json(saveCroissance );

    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création de la croissance" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de la croissance" });
        }
    }
}


const CroissanceController = {
    getAllCroissances,
    getCroissanceById,
    createCroissance
};

export default CroissanceController;