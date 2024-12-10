import mongoose from 'mongoose';
import { getAllMorphologies, getMorphologieById } from '../../controllers/morphologieController';
import morphologieModel from '../../models/morphologieModel';

// Mock du modèle Mongoose
jest.mock('../../models/morphologieModel', () => ({
  find: jest.fn(),
  findById: jest.fn(),
}));

describe('Tests unitaires - morphologieController', () => {


  it('getAllMorphologies - Devrait récupérer toutes les morphologies', async () => {

    const mockId1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');
    const mockIdPlante1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899824');


    const mockId2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');
    const mockIdPlante2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899824');

    (morphologieModel.find as jest.Mock).mockResolvedValue([
        {
            _id: mockId1,
            idPlante: mockIdPlante1,
          
            formeGenerale: 'buisson',
            formeFeuille: 'elliptique',

            texture: 'rugueux',
            couleur: 'vert',
            tailleMax: 100,
            croissance: 'rapide',
        },
        {
          _id: mockId2,
          idPlante: mockIdPlante2,
        
          formeGenerale: 'buisson',
          formeFeuille: 'elliptique',

          texture: 'rugueux',
          couleur: 'vert',
          tailleMax: 100,
          croissance: 'rapide',
        }            
    ])

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllMorphologies(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([ 
      {
      _id: mockId1,
      idPlante: mockIdPlante1,
    
      formeGenerale: 'buisson',
      formeFeuille: 'elliptique',

      texture: 'rugueux',
      couleur: 'vert',
      tailleMax: 100,
      croissance: 'rapide',
  },
  {
    _id: mockId2,
    idPlante: mockIdPlante2,
  
    formeGenerale: 'buisson',
    formeFeuille: 'elliptique',

    texture: 'rugueux',
    couleur: 'vert',
    tailleMax: 100,
    croissance: 'rapide',
  }       ]);
  });

  it('getAllMorphologies - Devrait renvoyer les morphologies avec les bonnes propriétés', async () => {

    const mockId1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');
   
    const mockIdPlante1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');
   
    (morphologieModel.find as jest.Mock).mockResolvedValue([
        {
            _id: mockId1,
            idPlante: mockIdPlante1,
          
            formeGenerale: 'buisson',
            formeFeuille: 'elliptique',

            texture: 'rugueux',
            couleur: 'vert',
            tailleMax: 100,
            croissance: 'rapide',
        },      
    ])


    //Passage des données mokées au controlleur 
    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllMorphologies(req, res);

    const result = res.json.mock.calls[0][0];

    //Evaluation des résultats
    result.forEach((morphologie: any) => {

      expect(morphologie).toHaveProperty('_id');    
      expect(mongoose.Types.ObjectId.isValid(morphologie._id)).toBe(true);

      expect(morphologie).toHaveProperty('idPlante');
      expect(mongoose.Types.ObjectId.isValid(morphologie.idPlante)).toBe(true);

      
      expect(morphologie).toHaveProperty('tailleMax');
      expect(Number.isInteger(morphologie.tailleMax)).toBe(true);
      

      expect(morphologie).toHaveProperty('formeGenerale');
      expect(['buisson', 'arbre', 'rampante', 'en cascade', 'verticale', 'compacte', 'grimpante']).toContain(morphologie.formeGenerale);

      expect(morphologie).toHaveProperty('formeFeuille');
      expect(['lancéolée', 'elliptique', 'ovale', 'spathulée', 'corde', 'ronde', 'circulaire', 'oblongue', 'triangulaire', 'falciforme']).toContain(morphologie.formeFeuille);

      expect(morphologie).toHaveProperty('texture');
      expect(['lisse', 'rugueux', 'duveteux', 'scireux', 'velouté']).toContain(morphologie.texture);

      expect(morphologie).toHaveProperty('couleur');
      expect(['vert', 'panaché vert/blanc', 'gris-argenté', 'bleu-argenté', 'vert-argenté', 'marbré', 'rougeâtre', 'bordeaux']).toContain(morphologie.couleur);

      expect(morphologie).toHaveProperty('croissance');
      expect(['lente', 'moyenne', 'rapide']).toContain(morphologie.croissance);
    
    });
  })

  it('getAllMorphologies - Devrait envoyer une erreur 404 car réponse vide', async () => {
    (morphologieModel.find as jest.Mock).mockResolvedValue([]);

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllMorphologies(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({message:"Aucune morphologie trouvée"});
  });


  it('getAllMorphologies - Devrait retourner une erreur en cas de problème de base de données', async () => {
    
    (morphologieModel.find as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getAllMorphologies(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la récupération des morphologies' });

  });

  it('getMorphologieById - Devrait récupéré une morphologie', async () => {
   
    const mockId1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');
    const mockIdPlante1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899824');


    const mockId2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');
    const mockIdPlante2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899824');

    (morphologieModel.findById as jest.Mock).mockResolvedValue([
        {
            _id: mockId1,
            idPlante: mockIdPlante1,
          
            formeGenerale: 'buisson',
            formeFeuille: 'elliptique',

            texture: 'rugueux',
            couleur: 'vert',
            tailleMax: 100,
            croissance: 'rapide',
        },
          
    ])



    const req = { params: { idPlante: mockIdPlante1 } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getMorphologieById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([ 
      {
        _id: mockId1,
        idPlante: mockIdPlante1,
        
        formeGenerale: 'buisson',
        formeFeuille: 'elliptique',

        texture: 'rugueux',
        couleur: 'vert',
        tailleMax: 100,
        croissance: 'rapide',
      },
    
    ]);
  });

  it('getMorphologieById - Devrait retourner une erreur 404 car pas de morphologie trouvée', async () => {
    
    (morphologieModel.findById as jest.Mock).mockResolvedValue(null);

    const req = { params: { id: 'invalid-id' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getMorphologieById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Morphologie non trouvée' });
  });

  it('getMorphologieById - Devrait retourner une erreur en cas de problème de base de données', async () => {
  
    const mockId1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');

    (morphologieModel.findById as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = { params: { idPlante: mockId1 } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getMorphologieById(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la récupération de la morphologie' });

  });
  
  it('getMorphologieById - Devrait retourner une erreur si la connexion à la base de données échoue', async () => {
    
    const mockIdPlante1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899821');

    const mongoNetworkError = new Error('MongoNetworkError') as any;
    mongoNetworkError.name = 'MongoNetworkError';
    (morphologieModel.findById as jest.Mock).mockRejectedValue(mongoNetworkError);

    const req = { params: { idPlante: mockIdPlante1 } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getMorphologieById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });  
});
