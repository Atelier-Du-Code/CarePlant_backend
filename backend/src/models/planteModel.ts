import mongoose, { Document, Schema, Model } from 'mongoose';

//Définition du type
export interface TypePlante extends Document {
    idPlante: mongoose.Types.ObjectId;
    nomCommun: String;
    nomScientifique: String;
    idFamille: mongoose.Types.ObjectId;
    idGenre: mongoose.Types.ObjectId;
    idEspece: mongoose.Types.ObjectId;
    idVariete: mongoose.Types.ObjectId;
    idBesoin: mongoose.Types.ObjectId;
    idOrigine: mongoose.Types.ObjectId;
    idSolType: mongoose.Types.ObjectId;
    idParasite: mongoose.Types.ObjectId[];
    
    description: String;
    typeEnvironnement: 'Intérieur' | 'Extérieur'; 
   
    toxicite: boolean;
}

//Définition du schéma
const PlanteSchema: Schema<TypePlante> = new Schema({

    idPlante: { 
        type: mongoose.Schema.Types.ObjectId, 
        auto: true 
    },
    nomCommun: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,       
    },
    nomScientifique: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,       
    },

    idFamille: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Famille',
        required: true,
    },

    idGenre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true,
    },

    idEspece: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Espece',
        required: true,
    },

    idVariete: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variete',
        required: true,
    },
    idBesoin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Besoin',
        required: true,
    },
    idOrigine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Origine',
        required: true,
    },
    
    idParasite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parasite',
        required: true,
    }],
    

    description: {
        type: String,
        required: true,
        trim: true,          
    },

    typeEnvironnement: { 
        type: String, 
        enum: ['Intérieur', 'Extérieur'], 
        required: true 
    },

    toxicite: {
        type: Boolean,
        required: true
    }
})


// Définition du modèle
const PlanteModel: Model<TypePlante> = mongoose.model<TypePlante>('Plante', PlanteSchema);

export default PlanteModel;
