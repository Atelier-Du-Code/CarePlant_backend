import { Request, Response } from 'express';
import DiffusionModel from '../../../../models/herbier/plante/besoin/diffusionLumiereModel';


// Récupérer toutes les diffusionsLumiere
export const getAllDiffusions = async (req: Request, res: Response): Promise<void> => {
    try {
        const diffusions = await DiffusionModel.find();

        if( diffusions.length == 0)
        {
            res.status(404).json({ message: "Aucune diffusion trouvéé"});
            return;
        }

        res.status(200).json(diffusions);        
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des diffusions' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération des diffusions' });
        }
    }
};


// Récupérer Besoin par ID
export const getDiffusionById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        
        const diffusion = await DiffusionModel.findById(id);

        if (!diffusion) {
            res.status(404).json({ message: 'diffusion non trouvée' });
            return;
        }
        
        res.status(200).json(diffusion);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération de la diffusion' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération de la diffusion' });
        }
    }
}


export const createDiffusion = async (req: Request, res: Response): Promise<void> => {
    
    try {
        
        const { nom, description } = req.body;

        if (!nom|| !description) {
           res.status(400).json({ message: 'Les champs "nom" et "description" sont requis.' });
           return;
        }
        
        const nouvelleDiffusion = new DiffusionModel({nom, description});
        const saveDiffusion = await nouvelleDiffusion.save();

        res.status(200).json(saveDiffusion );

    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création de la diffusion" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création de la diffusion" });
        }
    }
}



const DiffusionLumiereController = {
    getAllDiffusions,
    getDiffusionById,
    createDiffusion
};

export default DiffusionLumiereController;