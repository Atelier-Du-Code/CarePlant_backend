import mongoose from 'mongoose';
import { getAllFamille, getFamilleById } from '../../controllers/familleController';
import FamilleModel from '../../models/familleModel'; 


// Mock du modèle Mongoose
jest.mock('../../models/familleModel', () => ({
    find: jest.fn(),
    findById: jest.fn(),
  }));
  
  describe('Tests unitaires - FamilleController', () => {

    it('GetAllFamilles - Devrait récupérer toutes les familles', async () => {

        const mockIdFamille1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');       
        const mockIdFamille2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');


        (FamilleModel.find as jest.Mock).mockResolvedValue([
            {
                _id: mockIdFamille1,
                nom: "Nom de la famille 1",
                description: "Description de la famille 1",                
            },
            {
                _id: mockIdFamille2,
                nom: "Nom de la famille 2",
                description: "Description de la famille 2",             
            }
        ])

        const req = {} as any;
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

        await getAllFamille(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            {
                _id: mockIdFamille1,
                nom: "Nom de la famille 1",
                description: "Description de la famille 1",                
            },
            {
                _id: mockIdFamille2,
                nom: "Nom de la famille 2",
                description: "Description de la famille 2",             
            }]);
    });


    it('GetAllFamilles - Devrait renvoyer les familles avec les bonnes propriétés', async () => {

       
        const mockIdFamille1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');       
       
    

        (FamilleModel.find as jest.Mock).mockResolvedValue([
            {
                _id: mockIdFamille1,
                nom: "Nom de la famille 1",
                description: "Description de la famille 1",                  
            },
        ]);
    
        const req = {} as any;
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    
        await getAllFamille(req, res); 
    
        const result = res.json.mock.calls[0][0];
    
        // Vérification des propriétés du premier élément (le seul ici)
        result.forEach((famille: any) => {
            // Vérification des propriétés du modèle Besoin
            expect(famille).toHaveProperty('nom');
            expect(famille).toHaveProperty('description');
           
            expect(famille.nom).toBe('Nom de la famille 1');
            expect(famille.description).toBe('Description de la famille 1');
          
        });
    });
    

  it('GetAllFamilles - Devrait envoyer une erreur 404 car réponse vide', async () => {
    (FamilleModel.find as jest.Mock).mockResolvedValue([]);

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllFamille(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({message:"Aucune famille trouvée"});
  });

 
  it('GetAllFamilles - Devrait retourner une erreur 500 car problème de base de données', async () => {
    
    (FamilleModel.find as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getAllFamille(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la récupération des familles' });

  });

 
  it('GetAllFamilles - Devrait retourner une erreur 500 si la connexion à la base de données échoue', async () => {
    
    const mongoNetworkError = new Error('MongoNetworkError') as any;
    mongoNetworkError.name = 'MongoNetworkError';
    (FamilleModel.find as jest.Mock).mockRejectedValue(mongoNetworkError);

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllFamille(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });

  it('GetFamilleById - Devrait récupérer une famille', async () => {

    const mockIdFamille1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');     

    
    (FamilleModel.findById as jest.Mock).mockResolvedValue([{
        _id: mockIdFamille1,
        nom: "Nom de la famille 1",
        description: "Description de la famille 1",        
    }]);

    const req = { params: { id: '1' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getFamilleById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{
        _id: mockIdFamille1,
        nom: "Nom de la famille 1",
        description: "Description de la famille 1",    
    }]);
  });
  
  it('GetFamilleById - Devrait retourner une erreur 404 car pas de famille trouvée', async () => {
    
    (FamilleModel.findById as jest.Mock).mockResolvedValue(null);

    const req = { params: { id: 'invalid-id' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getFamilleById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Famille non trouvée' });
  });


  it('GetFamilleById - Devrait retourner une erreur en cas de problème de base de données', async () => {
  
    (FamilleModel.findById as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = { params: { id: '1' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getFamilleById(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Erreur lors de la récupération de la famille" });

  });
 

  it('GetFamilleById - Devrait retourner une erreur si la connexion à la base de données échoue', async () => {
    
    const mongoNetworkError = new Error('MongoNetworkError') as any;
    mongoNetworkError.name = 'MongoNetworkError';
    (FamilleModel.findById as jest.Mock).mockRejectedValue(mongoNetworkError);

    const req = { params: { id: '1' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getFamilleById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });

  })