import mongoose from 'mongoose';
import { getAllGenres, getGenreById } from '../../controllers/genreController';
import genreModel from '../../models/herbier/taxonomie/genreModel'; 
import GenreModel from '../../models/herbier/taxonomie/genreModel';


// Mock du modèle Mongoose
jest.mock('../../models/genreModel', () => ({
    find: jest.fn(),
    findById: jest.fn(),
  }));
  
  describe('Tests unitaires - GenreController', () => {

    it('GetAllGenres - Devrait récupérer tous les genres', async () => {

        const mockIdGenre1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');
        const mockIdfamille1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');

        const mockIdGenre2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');
        const mockIdfamille2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');


        (genreModel.find as jest.Mock).mockResolvedValue([
            {
                _id: mockIdGenre1,
                nom: 'Nom du genre 1',
                description: 'Description du genre 1',
                idFamille: mockIdfamille1,
            },
            {
                _id: mockIdGenre2,
                nom: 'Nom du genre 2',
                description: 'Description du genre 2',
                idFamille: mockIdfamille2,
            }
        ])

        const req = {} as any;
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

        await getAllGenres(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            {
                _id: mockIdGenre1,
                nom: 'Nom du genre 1',
                description: 'Description du genre 1',
                idFamille: mockIdfamille1,
            },
            {
                _id: mockIdGenre2,
                nom: 'Nom du genre 2',
                description: 'Description du genre 2',
                idFamille: mockIdfamille2,
            }]);
    });


    it('GetAllEspeces - Devrait renvoyer les espèces avec les bonnes propriétés', async () => {

       
        const mockIdGenre1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');
        const mockIdfamille1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');

        (genreModel.find as jest.Mock).mockResolvedValue([
            {
                _id: mockIdGenre1,
                nom: 'Nom du genre 1',
                description: 'Description du genre 1',
                idFamille: mockIdfamille1,
            },
        ]);
    
        const req = {} as any;
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    
        await getAllGenres(req, res); 
    
        const result = res.json.mock.calls[0][0];
    
        // Vérification des propriétés du premier élément (le seul ici)
        result.forEach((genre: any) => {
            // Vérification des propriétés du modèle genres
            expect(genre).toHaveProperty('nom');
            expect(genre).toHaveProperty('description');
            expect(genre).toHaveProperty('idFamille');
           
            expect(genre.nom).toBe('Nom du genre 1');
            expect(genre.description).toBe('Description du genre 1');
            expect(mongoose.Types.ObjectId.isValid(genre.idFamille.toString())).toBe(true);
            expect(genre.idFamille.toString()).toBe(mockIdfamille1.toString());
    
        });
    });
    

  it('GetAllGenres - Devrait envoyer une erreur 404 car réponse vide', async () => {
    (GenreModel.find as jest.Mock).mockResolvedValue([]);

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllGenres(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({message:"Aucun genre trouvé"});
  });

 
  it('GetAllGenres - Devrait retourner une erreur 500 car problème de base de données', async () => {
    
    (GenreModel.find as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getAllGenres(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la récupération des genres' });

  });

 
  it('GetAllGenres - Devrait retourner une erreur 500 si la connexion à la base de données échoue', async () => {
    
    const mongoNetworkError = new Error('MongoNetworkError') as any;
    mongoNetworkError.name = 'MongoNetworkError';
    (GenreModel.find as jest.Mock).mockRejectedValue(mongoNetworkError);

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllGenres(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });

  it('GetGenreById - Devrait récupérer une espèce', async () => {

    const mockIdGenre1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');
    const mockIdfamille1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');
    
    (GenreModel.findById as jest.Mock).mockResolvedValue([{
        
            _id: mockIdGenre1,
            nom: 'Nom du genre 1',
            description: 'Description du genre 1',
            idFamille: mockIdfamille1,
        
    }]);

    const req = { params: { id: '1' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getGenreById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{
        _id: mockIdGenre1,
        nom: 'Nom du genre 1',
        description: 'Description du genre 1',
        idFamille: mockIdfamille1,    
    }]);
  });
  
  it("GetEspeceById - Devrait retourner une erreur 404 car pas de genre trouvé", async () => {
    
    (GenreModel.findById as jest.Mock).mockResolvedValue(null);

    const req = { params: { id: 'invalid-id' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getGenreById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Genre non trouvé' });
  });


  it('GetGenreById - Devrait retourner une erreur en cas de problème de base de données', async () => {
  
    (GenreModel.findById as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = { params: { id: '1' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getGenreById(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Erreur lors de la récupération du genre" });

  });
 

  it('GetGenreById - Devrait retourner une erreur si la connexion à la base de données échoue', async () => {
    
    const mongoNetworkError = new Error('MongoNetworkError') as any;
    mongoNetworkError.name = 'MongoNetworkError';
    (GenreModel.findById as jest.Mock).mockRejectedValue(mongoNetworkError);

    const req = { params: { id: '1' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getGenreById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });

  })