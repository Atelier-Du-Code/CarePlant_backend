import mongoose from 'mongoose';
import { getAllImagesForOnePlante, getOneImageForOnePlante } from '../../controllers/imagesPlanteController';
import ImagesPlanteModel from '../../models/imagesPlanteModel'; 

jest.mock('../../models/imagesPlanteModel', () => ({
    find: jest.fn(),
    findById: jest.fn(),
  }));
  
  describe('Tests unitaires - imagesPlanteController', () => {

    it("getAllImagesForOnePlante - Devrait récupérer toutes les images d'une plante", async () => {

        const mockIdPlante1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899821');
        const mockIdPlante2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899823');

        const mockIdImage1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');
        const mockIdImage2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899824');

        (ImagesPlanteModel.find as jest.Mock).mockResolvedValue([
            {
                idImagePlante: mockIdImage1,
                idPlante: mockIdPlante1,
                url: 'http://example.com/image1.jpg',
                description: 'Première image de la plante',
            },
            {
                idImagePlante: mockIdImage2,
                idPlante: mockIdPlante1,
                url: 'http://example.com/image2.jpg',
                description: 'Deuxième image de la plante',
            }            
        ])

        const req = { params: { idPlante: mockIdPlante1 } } as any;
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

        await getAllImagesForOnePlante(req, res);

        expect(ImagesPlanteModel.find).toHaveBeenCalledWith({ idPlante: mockIdPlante1 });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            {
                idImagePlante: mockIdImage1,
                idPlante: mockIdPlante1,
                url: 'http://example.com/image1.jpg',
                description: 'Première image de la plante',
            },
            {
                idImagePlante: mockIdImage2,
                idPlante: mockIdPlante1,
                url: 'http://example.com/image2.jpg',
                description: 'Deuxième image de la plante',
            }
        ]);
    });


    it('getAllImagesForOnePlante - Devrait renvoyer les imagesPlante avec les bonnes propriétés', async () => {

      const mockIdPlante1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899821');     
      const mockIdImage1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');
    
        (ImagesPlanteModel.find as jest.Mock).mockResolvedValue([
          {
            idImagePlante: mockIdImage1,
            idPlante: mockIdPlante1,
            url: 'http://example.com/image1.jpg',
            description: 'Première image de la plante',
        },
        ]);
    
        const req = { params: { idPlante: mockIdPlante1 } } as any;
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    
        await getAllImagesForOnePlante(req, res); 
                
        const result = res.json.mock.calls[0][0];
        console.log(result);
     
        result.forEach((imageDePlante: any) => {
          expect(mongoose.Types.ObjectId.isValid(imageDePlante.idImagePlante)).toBe(true);
          expect(mongoose.Types.ObjectId.isValid(imageDePlante.idPlante)).toBe(true);
          expect(imageDePlante).toHaveProperty('idImagePlante');
          expect(imageDePlante).toHaveProperty('idPlante');
          expect(imageDePlante).toHaveProperty('url');
          expect(imageDePlante).toHaveProperty('description');
        });        
    });

  it('getAllImagesForOnePlante - Devrait envoyer une erreur 404 car réponse vide', async () => {
  
    (ImagesPlanteModel.find as jest.Mock).mockResolvedValue([]);
    
    const req = { params: { idPlante: 'invalid-id' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllImagesForOnePlante(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({message:"Aucune image trouvée pour cette plante"});
  });

    
  it('getAllImagesForOnePlante - Devrait retourner une erreur 500 car problème de base de données', async () => {
    
    (ImagesPlanteModel.find as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = { params: { idPlante: 'invalid-id' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getAllImagesForOnePlante(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la récupération des images de la plante' });

  });
 
  it('getAllImagesForOnePlante - Devrait retourner une erreur 500 si la connexion à la base de données échoue', async () => {
    
    const mockIdPlante1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899821');  

    const mongoNetworkError = new Error('MongoNetworkError');
    mongoNetworkError.name = 'MongoNetworkError';

    (ImagesPlanteModel.find as jest.Mock).mockRejectedValue(mongoNetworkError);

    const req = { params: { idPlante: mockIdPlante1 } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllImagesForOnePlante(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });

  it("getOneImageForOnePlante - Devrait récupérer une image d'une plante", async () => {

    const mockIdPlante1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899821');
    const mockIdImage1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');

    (ImagesPlanteModel.findById as jest.Mock).mockResolvedValue([
      {
        idImagePlante: mockIdImage1,
        idPlante: mockIdPlante1,
        url: 'http://example.com/image1.jpg',
        description: 'Première image de la plante',
      }            
    ])

    const req = { params: { idPlante: mockIdPlante1, idImagePlante: mockIdImage1 } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getOneImageForOnePlante(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{
      idImagePlante: mockIdImage1,
      idPlante: mockIdPlante1,
      url: 'http://example.com/image1.jpg',
      description: 'Première image de la plante',
    }]);
  });

  it("getOneImageForOnePlante - Devrait retourner une erreur 404 car pas d'image trouvée pour ces id de plante et d'image ", async () => {
    
    (ImagesPlanteModel.findById as jest.Mock).mockResolvedValue(null);

    const req = { params: { idPlante: 'InvalidId', idImagePlante: 'InvalidId' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getOneImageForOnePlante(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Image de plante non trouvée' });
  });


  it('getOneImageForOnePlante - Devrait retourner une erreur en cas de problème de base de données', async () => {
  
    const mockIdPlante1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899821');
    const mockIdImage1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');

    (ImagesPlanteModel.findById as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = { params: { idPlante: mockIdPlante1, idImagePlante: mockIdImage1 } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getOneImageForOnePlante(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Erreur lors de la récupération de l'image de la plante" });

  });
  

  it('getOneImageForOnePlante - Devrait retourner une erreur si la connexion à la base de données échoue', async () => {
    
    const mockIdPlante1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899821');
    const mockIdImage1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');

    const mongoNetworkError = new Error('MongoNetworkError') as any;
    mongoNetworkError.name = 'MongoNetworkError';

    (ImagesPlanteModel.findById as jest.Mock).mockRejectedValue(mongoNetworkError);

    const req = { params: { idPlante: mockIdPlante1, idImagePlante: mockIdImage1 } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getOneImageForOnePlante(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });
  })