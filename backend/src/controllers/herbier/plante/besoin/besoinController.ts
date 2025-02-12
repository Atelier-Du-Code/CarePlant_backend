import { Request, Response } from 'express';
import BesoinModel from '../../../../models/herbier/plante/besoin/besoinModel';


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


export const createBesoin = async (req: Request, res: Response): Promise<void> => {
    
    try {
        
        const { idsExposition, idsDiffusionLumiere, idTauxHumidite, idsArrosages, tempMin, tempMax, idsAstuce } = req.body;

        if (!idsExposition || !idsDiffusionLumiere || !idTauxHumidite || !idsArrosages || !tempMin || !tempMax || !idsAstuce) {
           res.status(400).json({ message: 'Les champs "idsExposition", "idsDiffusionLumiere", "idTauxHumidite", "idsArrosages", "tempMin", "tempMax", "idsAstuce" sont requis.' });
           return;
        }
        

        const existingBesoin = await BesoinModel.findOne({ idsExposition, idsDiffusionLumiere, idTauxHumidite, idsArrosages });

        if (existingBesoin) {
            res.status(409).json({ message: "Un besoin avec ce nom existe déjà." });
            return;
        }

        const nouveauBesoin = new BesoinModel({idsExposition, idsDiffusionLumiere, idTauxHumidite, idsArrosages, tempMin, tempMax, idsAstuce});
        const saveBesoin  = await nouveauBesoin.save();

        res.status(200).json(saveBesoin );

    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la création du besoin" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la création du besoin" });
        }
    }
}


// Mettre à jour un besoin par ID
export const updateBesoin = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nom, description } = req.body;

    try {
        const updatedBesoin = await BesoinModel.findByIdAndUpdate(id, { nom, description }, { new: true });

        if (!updatedBesoin) {
            res.status(404).json({ message: "Besoin non trouvé" });
            return;
        }

        res.status(200).json(updatedBesoin);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la mise à jour du besoin" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la mise à jour du besoin" });
        }
    }
};

// Supprimer un besoin par ID
export const deleteBesoin = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const besoin = await BesoinModel.findByIdAndDelete(id);

        if (!besoin) {
            res.status(404).json({ message: "Besoin non trouvé" });
            return;
        }

        res.status(200).json({ message: "Besoin supprimé avec succès" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la suppression du besoin" });
            }
        } else {
            res.status(500).json({ message: "Erreur inconnue lors de la suppression du besoin" });
        }
    }
};



const besoinController = {
    getAllBesoins,
    getBesoinById,
    createBesoin,
    updateBesoin,
    deleteBesoin
};

export default besoinController;