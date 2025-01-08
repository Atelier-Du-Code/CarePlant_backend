import { Request, Response } from 'express';
import VarieteModel from '../models/herbier/taxonomie/varieteModel';

// Récupérer toutes les variétés
export const getAllVarietes = async (req: Request, res: Response): Promise<void> => {
    try {
        const varietes = await VarieteModel.find();

        if( varietes.length == 0)
        {
            res.status(404).json({ message: "Aucune variété trouvée"});
            return;
        }

        res.status(200).json(varietes);        
    } catch (error) {
        if (error instanceof Error) {           
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des variétés' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue' });
        }
    }
};

// Récupérer une variété par son ID
export const getVarieteById = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.params;

    try {
        
        const variete = await VarieteModel.findById(id);

        if (!variete) {
            res.status(404).json({ message: 'Variété non trouvée' });
            return;
        }
        
        res.status(200).json(variete);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de la variété" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de la variété" });
        }
    }
}


const VarieteController = {
    getAllVarietes,
    getVarieteById
};

export default VarieteController;