import mongoose from 'mongoose';
import { getAllOrigines, getOrigineById } from '../../controllers/origineController';
import OrigineModel from '../../models/origineModel';

// Mock du modèle Mongoose
jest.mock('../../models/origineModel', () => ({
  find: jest.fn(),
  findById: jest.fn(),
}));

describe('Tests unitaires - originesController', () => {


  it('getAllOrigines - Devrait récupérer toutes les origines', async () => {

    const mockId1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');
    const mockId2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');
   

    (OrigineModel.find as jest.Mock).mockResolvedValue([
        {
            _id: mockId1,       
          
            nom: 'Origine1',
            description: 'Description origine 1',
        },
        {
          _id: mockId2,       
        
          nom: 'Origine2',
          description: 'Description origine 2',
      },        
    ])

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllOrigines(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([ 
      {
        _id: mockId1,       
      
        nom: 'Origine1',
        description: 'Description origine 1',
    },
    {
      _id: mockId2,       
    
      nom: 'Origine2',
      description: 'Description origine 2',
  },        
    
    ]);
  });

  it('getAllOrigines - Devrait renvoyer les origines avec les bonnes propriétés', async () => {

    const mockId1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');
   
   
    (OrigineModel.find as jest.Mock).mockResolvedValue([
      {
        _id: mockId1,            
        nom: 'Origine1',
        description: 'Description origine 1',
      },     
    ])

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllOrigines(req, res);

    const result = res.json.mock.calls[0][0];

    result.forEach((origine: any) => {

      expect(origine).toHaveProperty('_id');    
      expect(mongoose.Types.ObjectId.isValid(origine._id)).toBe(true);      
      
      expect(origine).toHaveProperty('nom');
      expect(typeof origine.nom).toBe('string');       

      expect(origine).toHaveProperty('description');
      expect(typeof origine.nom).toBe('string'); 

    });
  })

  it('getAllOrigines - Devrait envoyer une erreur 404 car réponse vide', async () => {

    (OrigineModel.find as jest.Mock).mockResolvedValue([]);

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllOrigines(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({message:"Aucune origine trouvée"});
  });


  it('getAllOrigines - Devrait retourner une erreur en cas de problème de base de données', async () => {
    
    (OrigineModel.find as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getAllOrigines(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la récupération des origines' });

  });

  it('getOrigineById - Devrait récupéré une origine', async () => {
   
    const mockId1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');
   

    (OrigineModel.findById as jest.Mock).mockResolvedValue([
      {
        _id: mockId1,            
        nom: 'Origine1',
        description: 'Description origine 1',
      },     
          
    ])



    const req = { params: { _id: mockId1 } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getOrigineById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([ 
      {
        _id: mockId1,            
        nom: 'Origine1',
        description: 'Description origine 1',
      },        
    ]);
  });

  it("getOrigineById - Devrait retourner une erreur 404 car pas d'origine trouvée", async () => {
    
    (OrigineModel.findById as jest.Mock).mockResolvedValue(null);

    const req = { params: { _id: 'invalid-id' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getOrigineById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Origine non trouvée' });
  });
  
  it('getOrigineById - Devrait retourner une erreur en cas de problème de base de données', async () => {
  
    const mockId1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');

    (OrigineModel.findById as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = { params: { id: mockId1 } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getOrigineById(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Erreur lors de la récupération de l'origine" });

  });

  
  it('getOrigineById - Devrait retourner une erreur si la connexion à la base de données échoue', async () => {
    
    const mockId1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899821');

    const mongoNetworkError = new Error('MongoNetworkError') as any;
    mongoNetworkError.name = 'MongoNetworkError';
    (OrigineModel.findById as jest.Mock).mockRejectedValue(mongoNetworkError);

    const req = { params: { id: mockId1 } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getOrigineById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });  
  
});
