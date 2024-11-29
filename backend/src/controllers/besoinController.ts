import { Request, Response } from 'express';
import BesoinModel from '../models/besoinModel';


// Récupérer tous les Besoins
export const getAllBesoins = async (req: Request, res: Response): Promise<void> => {
    try {
        const besoins = await BesoinModel.find();

        if( besoins.length == 0)
        {
            res.status(404).json({ message: "Aucun besoin trouvé"});
            return;
        }

        res.status(200).json(besoins);        
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des besoins' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération des besoins' });
        }
    }
};


// Récupérer Besoin par ID
export const getBesoinById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        
        const besoin = await BesoinModel.findById(id);

        if (!besoin) {
            res.status(404).json({ message: 'Besoin non trouvé' });
            return;
        }
        
        res.status(200).json(besoin);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération du besoin' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération du besoin' });
        }
    }
}


const arrosageController = {
    getAllBesoins,
    getBesoinById
};

export default arrosageController;