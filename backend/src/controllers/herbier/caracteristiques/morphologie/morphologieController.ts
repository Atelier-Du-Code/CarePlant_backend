import { Request, Response } from 'express';
import MorphologieModel from '../../../../models/herbier/caracteristiques/morphologie/morphologieModel';

// Récupérer tous les Arrosages
export const getAllMorphologies = async (req: Request, res: Response): Promise<void> => {
    try {
        const morphologies = await MorphologieModel.find();

        if( morphologies.length == 0)
        {
            res.status(404).json({ message: "Aucune morphologie trouvée"});
            return;
        }

        res.status(200).json(morphologies);        
    } catch (error) {
        if (error instanceof Error) {           
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des morphologies' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue' });
        }
    }
};

// Récupérer Arrosage par ID
export const getMorphologieById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        
        const morphologie = await MorphologieModel.findById(id);

        if (!morphologie) {
            res.status(404).json({ message: 'Morphologie non trouvée' });
            return;
        }
        
        res.status(200).json(morphologie);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération de la morphologie' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la création de la morphologie' });
        }
    }
}


const MorphologieController = {
    getAllMorphologies,
    getMorphologieById
};

export default MorphologieController;