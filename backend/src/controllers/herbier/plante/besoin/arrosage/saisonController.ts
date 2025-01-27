import { Request, Response } from 'express';
import SaisonModel from '../../../../../models/herbier/plante/besoin/arrosage/saisonModel';


// Récupérer toutes les saisons
export const getAllSaisons = async (req: Request, res: Response): Promise<void> => {
    try {
        const saisons = await SaisonModel.find();

        if( saisons.length == 0)
        {
            res.status(404).json({ message: "Aucune saison trouvée"});
            return;
        }

        res.status(200).json(saisons);        
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des saisons' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération des saisons' });
        }
    }
};


// Récupérer une saison par ID
export const getSaisonById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        
        const saison = await SaisonModel.findById(id);

        if (!saison) {
            res.status(404).json({ message: 'Saison non trouvée' });
            return;
        }
        
        res.status(200).json(saison);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération de la saison" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la récupération de la saison" });
        }
    }
}


const SaisonController = {
    getAllSaisons,
    getSaisonById,
};

export default SaisonController;