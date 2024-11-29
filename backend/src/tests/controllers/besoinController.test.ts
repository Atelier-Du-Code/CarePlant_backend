import mongoose from 'mongoose';
import { getAllBesoins, getBesoinById } from '../../controllers/besoinController';
import BesoinModel from '../../models/besoinModel'; 



// Mock du modèle Mongoose
jest.mock('../../models/besoinModel', () => ({
    find: jest.fn(),
    findById: jest.fn(),
  }));
  
  describe('Tests unitaires - BesoinController', () => {

    it('GetAllBesoins - Devrait récupérer tous les besoins', async () => {

        const mockIdBesoin1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899821');
        const mockIdBesoin2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899823');

        const mockArrosageId1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899822');
        const mockArrosageId2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899824');

        (BesoinModel.find as jest.Mock).mockResolvedValue([
            {
                _id: mockIdBesoin1,
                luminositeIntensite: 'vive',
                luminositeType: 'indirecte',
                tauxHumidite: 'forte',
                tempMin: 12,
                tempMax: 25,
                astuces: ['Astuce 1', 'Astuce 2'],
                arrosage: [mockArrosageId1],
            },
            {
                _id: mockIdBesoin2,
                luminositeIntensite: 'lumineuse',
                luminositeType: 'indirecte',
                tauxHumidite: 'faible',
                tempMin: 12,
                tempMax: 25,
                astuces: ['Astuce 1', 'Astuce 2'],
                arrosage: [mockArrosageId2],
            }
        ])

        const req = {} as any;
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

        await getAllBesoins(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
        {
            _id: mockIdBesoin1,
            luminositeIntensite: 'vive',
            luminositeType: 'indirecte',
            tauxHumidite: 'forte',
            tempMin: 12,
            tempMax: 25,
            astuces: ['Astuce 1', 'Astuce 2'],
            arrosage: [mockArrosageId1],
        },
        {
            _id: mockIdBesoin2,
            luminositeIntensite: 'lumineuse',
            luminositeType: 'indirecte',
            tauxHumidite: 'faible',
            tempMin: 12,
            tempMax: 25,
            astuces: ['Astuce 1', 'Astuce 2'],
            arrosage: [mockArrosageId2],
        }]);
    });


    it('GetAllBesoins - Devrait renvoyer les besoins avec les bonnes propriétés', async () => {

        const mockIdBesoin1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899831');
        const mockArrosageId1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899832');
       

        (BesoinModel.find as jest.Mock).mockResolvedValue([
            {
                _id: mockIdBesoin1,
                luminositeIntensite: 'vive',
                luminositeType: 'indirecte',
                tauxHumidite: 'forte',
                tempMin: 12,
                tempMax: 25,
                astuces: ['Astuce 1', 'Astuce 2'],
                arrosage: [mockArrosageId1],
            }
        ]);
    
        const req = {} as any;
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    
        await getAllBesoins(req, res); 
    
        const result = res.json.mock.calls[0][0];
    
        // Vérification des propriétés du premier élément (le seul ici)
        result.forEach((besoin: any) => {
            // Vérification des propriétés du modèle Besoin
            expect(besoin).toHaveProperty('luminositeIntensite');
            expect(besoin).toHaveProperty('luminositeType');
            expect(besoin).toHaveProperty('tauxHumidite');
            expect(besoin).toHaveProperty('tempMin');
            expect(besoin).toHaveProperty('tempMax');
            expect(besoin).toHaveProperty('astuces');
            expect(besoin).toHaveProperty('arrosage');
    
            // Vérification de la propriété 'arrosage' (tableau d'ObjectId)
            expect(besoin.arrosage).toBeInstanceOf(Array);
            expect(besoin.arrosage.length).toBeGreaterThan(0);
            expect(mongoose.Types.ObjectId.isValid(besoin.arrosage[0].toString())).toBe(true);
        });
    
       
        expect(result[0].luminositeIntensite).toBe('vive');
        expect(result[0].luminositeType).toBe('indirecte');

        expect(result[0].tauxHumidite).toBe('forte');

        expect(result[0].tempMin).toBe(12);
        expect(result[0].tempMax).toBe(25);
   
        expect(result[0].astuces).toBeInstanceOf(Array);
        expect(result[0].astuces.length).toBeGreaterThan(0);
        expect(result[0].astuces).toContain('Astuce 1');
        expect(result[0].astuces).toContain('Astuce 2');
    });
    

  it('GetAllBesoins - Devrait envoyer une erreur 404 car réponse vide', async () => {
    (BesoinModel.find as jest.Mock).mockResolvedValue([]);

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllBesoins(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({message:"Aucun besoin trouvé"});
  });

  it('GetAllBesoins - Devrait retourner une erreur 500 car problème de base de données', async () => {
    
    (BesoinModel.find as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getAllBesoins(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la récupération des besoins' });

  });


  it('GetAllBesoin - Devrait retourner une erreur 500 si la connexion à la base de données échoue', async () => {
    
    const mongoNetworkError = new Error('MongoNetworkError') as any;
    mongoNetworkError.name = 'MongoNetworkError';
    (BesoinModel.find as jest.Mock).mockRejectedValue(mongoNetworkError);

    const req = {} as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getAllBesoins(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });






  it('GetBesoinById - Devrait récupérer un besoin', async () => {

    const mockIdBesoin1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8894821');
    const mockIdBesoin2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8899823');

    const mockArrosageId1 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8499822');
    const mockArrosageId2 = new mongoose.Types.ObjectId('6749cbed0f2936d7a8499824');

    
    (BesoinModel.findById as jest.Mock).mockResolvedValue([{
        _id: mockIdBesoin1,
        luminositeIntensite: 'vive',
        luminositeType: 'indirecte',
        tauxHumidite: 'forte',
        tempMin: 12,
        tempMax: 25,
        astuces: ['Astuce 1', 'Astuce 2'],
        arrosage: [mockArrosageId1],
    },
    {
        _id: mockIdBesoin2,
        luminositeIntensite: 'lumineuse',
        luminositeType: 'indirecte',
        tauxHumidite: 'faible',
        tempMin: 12,
        tempMax: 25,
        astuces: ['Astuce 1', 'Astuce 2'],
        arrosage: [mockArrosageId2],
    }]);

    const req = { params: { id: '1' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getBesoinById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{
        _id: mockIdBesoin1,
        luminositeIntensite: 'vive',
        luminositeType: 'indirecte',
        tauxHumidite: 'forte',
        tempMin: 12,
        tempMax: 25,
        astuces: ['Astuce 1', 'Astuce 2'],
        arrosage: [mockArrosageId1],
    },
    {
        _id: mockIdBesoin2,
        luminositeIntensite: 'lumineuse',
        luminositeType: 'indirecte',
        tauxHumidite: 'faible',
        tempMin: 12,
        tempMax: 25,
        astuces: ['Astuce 1', 'Astuce 2'],
        arrosage: [ mockArrosageId2 ],
    }]);
  });


 
  
  it('GetBesoinById - Devrait retourner une erreur 404 car pas de besoin trouvé', async () => {
    
    (BesoinModel.findById as jest.Mock).mockResolvedValue(null);

    const req = { params: { id: 'invalid-id' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getBesoinById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Besoin non trouvé' });
  });


  it('GetBesoinById - Devrait retourner une erreur en cas de problème de base de données', async () => {
  
    (BesoinModel.findById as jest.Mock).mockRejectedValue(new Error('Erreur base de données'));
  
    const req = { params: { id: '1' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
  
    await getBesoinById(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la récupération du besoin' });

  });
 

  it('GetBesoinById - Devrait retourner une erreur si la connexion à la base de données échoue', async () => {
    
    const mongoNetworkError = new Error('MongoNetworkError') as any;
    mongoNetworkError.name = 'MongoNetworkError';
    (BesoinModel.findById as jest.Mock).mockRejectedValue(mongoNetworkError);

    const req = { params: { id: '1' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;

    await getBesoinById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur de connexion à la base de données' });
  });

  })