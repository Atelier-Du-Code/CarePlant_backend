import { Request, Response } from 'express';
import solTypeModel from '../../../models/herbier/caracteristiques/solTypeModel';

// Récupérer tous les solTypes
export const getAllSolTypes = async (req: Request, res: Response): Promise<void> => {
    try {
        const solTypes = await solTypeModel.find();

        if( solTypes.length == 0)
        {
            res.status(404).json({ message: "Aucun solType trouvé"});
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
    } catch (error:unknown) {

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
}

export const createTypeSol = async (req: Request, res: Response): Promise<void> => {
    
    try {
        
        const { type, description } = req.body;

        if (!type || !description) {
           res.status(400).json({ message: 'Les champs "type" et "description" sont requis.' });
           return;
        }
        
        const nouveauSolType = new solTypeModel({type, description});
        const saveSolType  = await nouveauSolType.save();

        res.status(200).json(saveSolType );

    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création dut type de sol" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création du type de sol" });
        }
    }
}


const SolTypeController = {
    getAllSolTypes,
    getSolTypeById, 
    createTypeSol
};

export default SolTypeController;