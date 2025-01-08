import { Request, Response } from 'express';
import GenreModel from '../models/herbier/taxonomie/genreModel';


// Récupérer tous les genres
export const getAllGenres = async (req: Request, res: Response): Promise<void> => {
    try {
        const genres = await GenreModel.find();

        if( genres.length == 0)
        {
            res.status(404).json({ message: "Aucun genre trouvé"});
            return;
        }

        res.status(200).json(genres);        
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: 'Erreur lors de la récupération des genres' });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération des genres' });
        }
    }
};


// Récupérer un genre par ID
export const getGenreById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        
        const genre = await GenreModel.findById(id);

        if (!genre) {
            res.status(404).json({ message: 'Genre non trouvé' });
            return;
        }
        
        res.status(200).json(genre);
    } catch (error:unknown) {

        if (error instanceof Error) { 
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            } else {
                res.status(500).json({ message: "Erreur lors de la récupération du genre" });
            }
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération du genre' });
        }
    }
}

const genreController = {
    getAllGenres,
    getGenreById
};

export default genreController;