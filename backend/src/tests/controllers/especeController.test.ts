import mongoose from 'mongoose';
import { getAllEspeces, getEspeceById } from '../../controllers/especeController';
import EspeceModel from '../../models/herbier/taxonomie/especeModel'; 


// Mock du modèle Mongoose
jest.mock('../../models/especeModel', () => ({
    find: jest.fn(),
    findById: jest.fn(),
  }));
  
  describe('Tests unitaires - EspeceController', () => {

    it('GetAllEspeces - Devrait récupérer toutes les espèces', async () => {

        const mockIdEspece1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');
        const mockIdGenre1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');

        const mockIdEspece2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');
        const mockIdGenre2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');


        (EspeceModel.find as jest.Mock).mockResolvedValue([
            {
                _id: mockIdEspece1,
                nom: 'nom de l espece 1',
                description: 'c est la description de l espece 1',
                idGenre: mockIdGenre1,
            },
            {
                _id: mockIdEspece2,
                nom: 'nom de l espece 2',
                description: 'c est la description de l espece 2',               
                idGenre: mockIdGenre2,
            }
        ])

        const req = {} as any;
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

        await getAllEspeces(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            {
                _id: mockIdEspece1,
                nom: 'nom de l espece 1',
                description: 'c est la description de l espece 1',
                idGenre: mockIdGenre1,
            },
            {
                _id: mockIdEspece2,
                nom: 'nom de l espece 2',
                description: 'c est la description de l espece 2',               
                idGenre: mockIdGenre2,
            }]);
    });


    it('GetAllEspeces - Devrait renvoyer les espèces avec les bonnes propriétés', async () => {

       
        const mockIdEspece1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');
        const mockIdGenre1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');      

        (EspeceModel.find as jest.Mock).mockResolvedValue([
            {
                _id: mockIdEspece1,
                nom: 'nom de l espece 1',
                description: 'c est la description de l espece 1',
                idGenre: mockIdGenre1,
            },
        ]);
    
        const req = {} as any;
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    
        await getAllEspeces(req, res); 
    
        const result = res.json.mock.calls[0][0];
    
        // Vérification des propriétés du premier élément (le seul ici)
        result.forEach((espece: any) => {
            // Vérification des propriétés du modèle Besoin
            expect(espece).toHaveProperty('nom');
            expect(espece).toHaveProperty('description');
            expect(espece).toHaveProperty('idGenre');
           
            expect(espece.nom).toBe('nom de l espece 1');
            expect(espece.description).toBe('c est la description de l espece 1');
            expect(mongoose.Types.ObjectId.isValid(espece.idGenre.toString())).toBe(true);
            expect(espece.idGenre.toString()).toBe(mockIdGenre1.toString());
    
        });
    });
    

  it('GetAllEspeces - Devrait envoyer une erreur 404 car réponse vide', async () => {
    (EspeceModel.find as jest.Mock).mockResolvedValue([]);

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllEspeces(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({message:"Aucune espèce trouvée"});
  });

 
  it('GetAllEspeces - Devrait retourner une erreur 500 car problème de base de données', async () => {
    
    (EspeceModel.find as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getAllEspeces(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la récupération des besoins' });

  });

 
  it('GetAllEspeces - Devrait retourner une erreur 500 si la connexion à la base de données échoue', async () => {
    
    const mongoNetworkError = new Error('MongoNetworkError') as any;
    mongoNetworkError.name = 'MongoNetworkError';
    (EspeceModel.find as jest.Mock).mockRejectedValue(mongoNetworkError);

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllEspeces(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });

  it('GetEspeceById - Devrait récupérer une espèce', async () => {

    const mockIdEspece1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');
    const mockIdGenre1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');      

    
    (EspeceModel.findById as jest.Mock).mockResolvedValue([{
        _id: mockIdEspece1,
        nom: 'nom de l espece 1',
        description: 'c est la description de l espece 1',
        idGenre: mockIdGenre1,
    }]);

    const req = { params: { id: '1' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getEspeceById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{
        _id: mockIdEspece1,
        nom: 'nom de l espece 1',
        description: 'c est la description de l espece 1',
        idGenre: mockIdGenre1,
    }]);
  });
  
  it("GetEspeceById - Devrait retourner une erreur 404 car pas d'espèce trouvée", async () => {
    
    (EspeceModel.findById as jest.Mock).mockResolvedValue(null);

    const req = { params: { id: 'invalid-id' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getEspeceById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Espèce non trouvée' });
  });


  it('GetEspeceById - Devrait retourner une erreur en cas de problème de base de données', async () => {
  
    (EspeceModel.findById as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = { params: { id: '1' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getEspeceById(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Erreur lors de la récupération de l'espèce" });

  });
 

  it('GetEspeceById - Devrait retourner une erreur si la connexion à la base de données échoue', async () => {
    
    const mongoNetworkError = new Error('MongoNetworkError') as any;
    mongoNetworkError.name = 'MongoNetworkError';
    (EspeceModel.findById as jest.Mock).mockRejectedValue(mongoNetworkError);

    const req = { params: { id: '1' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getEspeceById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });

  })