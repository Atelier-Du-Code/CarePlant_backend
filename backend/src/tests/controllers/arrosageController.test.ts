import { getAllArrosages, getArrosageById } from '../../controllers/herbier/plante/besoin/arrosage/arrosageController';
import ArrosageModel from '../../models/corrigés/arrosageModel';

// Mock du modèle Mongoose
jest.mock('../../models/arrosageModel', () => ({
  find: jest.fn(),
  findById: jest.fn(),
}));

describe('Tests unitaires - ArrosageController', () => {


  it('GetAllArrossages - Devrait récupérer tous les arrosages', async () => {
    (ArrosageModel.find as jest.Mock).mockResolvedValue([{ id: 1, name: 'Arrosage 1' }]);

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllArrosages(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Arrosage 1' }]);
  });

  it('GetAllArrossages - Devrait renvoyer les arrosages avec les bonnes propriétés', async () => {

    //Appel à la base de données 
    (ArrosageModel.find as jest.Mock).mockResolvedValue([
        { frequence: 7, saison: 'été' },
        { frequence: 14, saison: 'printemps' },
        { frequence: 28, saison: 'automne' }
    ]);

    //Passage des données mokées au controlleur 
    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllArrosages(req, res);

    const result = res.json.mock.calls[0][0];

    //Evaluation des résultats
    result.forEach((arrosage: any) => {

        expect(arrosage).toHaveProperty('frequence');
        expect(arrosage.frequence).toBeGreaterThanOrEqual(1);
        expect(arrosage.frequence).toBeLessThanOrEqual(31);
        expect([1, 2, 3, 7, 14, 21, 28, 31]).toContain(arrosage.frequence);
  
        expect(arrosage).toHaveProperty('saison');
        expect(['printemps', 'été', 'automne', 'hiver']).toContain(arrosage.saison);
      });
  })


  it('GetAllArrossages - Devrait envoyer une erreur 404 car réponse vide', async () => {
    (ArrosageModel.find as jest.Mock).mockResolvedValue([]);

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllArrosages(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({message:"Aucun arrosage trouvé"});
  });


  it('GetAllArrossages - Devrait retourner une erreur en cas de problème de base de données', async () => {
    
    (ArrosageModel.find as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getAllArrosages(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la récupération des arrosages' });

  });



  it('GetArrosageById - Devrait retourner une erreur si la connexion à la base de données échoue', async () => {
    
    const mongoNetworkError = new Error('MongoNetworkError') as any;
    mongoNetworkError.name = 'MongoNetworkError';
    (ArrosageModel.find as jest.Mock).mockRejectedValue(mongoNetworkError);

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllArrosages(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });
 


  it('GetArrosageById - Devrait récupéré un arrosage', async () => {
    
    (ArrosageModel.findById as jest.Mock).mockResolvedValue([{ id: 1, name: 'Arrosage 1' }]);

    const req = { params: { id: '1' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getArrosageById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Arrosage 1' }]);
  });

  it('GetArrosageById - Devrait retourner une erreur 404 car pas arrosage trouvé', async () => {
    
    (ArrosageModel.findById as jest.Mock).mockResolvedValue(null);

    const req = { params: { id: 'invalid-id' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getArrosageById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Arrosage non trouvé' });
  });


  it('GetArrosageById - Devrait retourner une erreur en cas de problème de base de données', async () => {
  
    (ArrosageModel.findById as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = { params: { id: '1' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getArrosageById(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la récupération de l\'arrosage' });

  });


  it('GetArrosageById - Devrait retourner une erreur si la connexion à la base de données échoue', async () => {
    
    const mongoNetworkError = new Error('MongoNetworkError') as any;
    mongoNetworkError.name = 'MongoNetworkError';
    (ArrosageModel.findById as jest.Mock).mockRejectedValue(mongoNetworkError);

    const req = { params: { id: '1' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getArrosageById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });
  
});
