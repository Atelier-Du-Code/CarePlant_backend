import mongoose from 'mongoose';
import { getAllParasites, getParasiteById } from '../../controllers/parasiteController';
import ParasiteModel from '../../models/parasiteModel';




// Mock du modèle Mongoose
jest.mock('../../models/parasiteModel', () => ({
    find: jest.fn(),
    findById: jest.fn(),
}));
  
describe('Tests unitaires - ParasiteController', () => {  

  it('GetAllParasites - Devrait récupérer tous les parasites', async () => {

          const mockIdParasite1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');      
          const mockIdParasite2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');

          const mockIdUrl1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399822');
          const mockIdUrl2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399822');

          (ParasiteModel.find as jest.Mock).mockResolvedValue([
              {
                  _id: mockIdParasite1,
                  nom: 'Nom du parasite 1',
                  description: 'Description du parasite 1',
                  url: mockIdUrl1,
              },
              {
                  _id: mockIdParasite2,
                  nom: 'Nom du parasite 2',
                  description: 'Description du parasite 2',
                  url: mockIdUrl2,
              }
          ])

          const req = {} as any;
          const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

          await getAllParasites(req, res);

          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith([
              {
                  _id: mockIdParasite1,
                  nom: 'Nom du parasite 1',
                  description: 'Description du parasite 1',
                  url: mockIdUrl1,
              },
              {
                  _id: mockIdParasite2,
                  nom: 'Nom du parasite 2',
                  description: 'Description du parasite 2',
                  url: mockIdUrl2,
              }]);
  });


  it('GetAllEspeces - Devrait renvoyer les parasites avec les bonnes propriétés', async () => {

        
          const mockIdParasite1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');
          const mockIdUrl1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');

          (ParasiteModel.find as jest.Mock).mockResolvedValue([
              {
                  _id: mockIdParasite1,
                  nom: 'Nom du parasite 1',
                  description: 'Description du parasite 1',
                  url: mockIdUrl1,
              },
          ]);
      
          const req = {} as any;
          const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
      
          await getAllParasites(req, res); 
      
          const result = res.json.mock.calls[0][0];
      
      
          result.forEach((parasite: any) => {
            
              expect(parasite).toHaveProperty('nom');
              expect(parasite).toHaveProperty('description');
              expect(parasite).toHaveProperty('url');    
          });
  });
  
    

  it('GetAllParasites - Devrait envoyer une erreur 404 car réponse vide', async () => {
        (ParasiteModel.find as jest.Mock).mockResolvedValue([]);

        const req = {} as any;
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

        await getAllParasites(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({message:"Aucun parasite trouvé"});
  });


  it('GetAllParasites - Devrait retourner une erreur 500 car problème de base de données', async () => {
      
      (ParasiteModel.find as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
    
      const req = {} as any;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    
      await getAllParasites(req, res);
    
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la récupération des parasites' });

    });

    
  it('GetAllParasites - Devrait retourner une erreur 500 si la connexion à la base de données échoue', async () => {
      
      const mongoNetworkError = new Error('MongoNetworkError') as any;
      mongoNetworkError.name = 'MongoNetworkError';
      (ParasiteModel.find as jest.Mock).mockRejectedValue(mongoNetworkError);

      const req = {} as any;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

      await getAllParasites(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });

    
  it('GetParasiteById - Devrait récupérer un parasite', async () => {

      const mockIdParasite1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399821');
      const mockIdUrl1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8399822');

      (ParasiteModel.findById as jest.Mock).mockResolvedValue([
          {
              _id: mockIdParasite1,
              nom: 'Nom du parasite 1',
              description: 'Description du parasite 1',
              url: mockIdUrl1,
          },
      ])


      const req = { params: { id: '1' } } as any;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

      await getParasiteById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{
        _id: mockIdParasite1,
              nom: 'Nom du parasite 1',
              description: 'Description du parasite 1',
              url: mockIdUrl1,
      }]);
  });
    
    
  it("GetParasiteById - Devrait retourner une erreur 404 car pas de parasite trouvé", async () => {
      
      (ParasiteModel.findById as jest.Mock).mockResolvedValue(null);

      const req = { params: { id: 'invalid-id' } } as any;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

      await getParasiteById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Parasite non trouvé' });
  });


  it('GetParasiteById - Devrait retourner une erreur en cas de problème de base de données', async () => {
    
      (ParasiteModel.findById as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
    
      const req = { params: { id: '1' } } as any;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    
      await getParasiteById(req, res);
    
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Erreur lors de la récupération du parasite" });

  });


  it('GetParasiteById - Devrait retourner une erreur si la connexion à la base de données échoue', async () => {
      
      const mongoNetworkError = new Error('MongoNetworkError') as any;
      mongoNetworkError.name = 'MongoNetworkError';
      (ParasiteModel.findById as jest.Mock).mockRejectedValue(mongoNetworkError);

      const req = { params: { id: '1' } } as any;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

      await getParasiteById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });
  
})