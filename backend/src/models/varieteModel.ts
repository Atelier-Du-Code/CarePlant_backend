import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeVariete extends Document {
    idVariete: mongoose.Types.ObjectId;
    nom: String;
    description: String;
    caracteristiques: String[];
    idEspece: mongoose.Types.ObjectId;
 
}

const VarieteSchema: Schema<TypeVariete> = new Schema({
    idVariete: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variete',
        required: true
    },

    nom: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,       
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,       
    },

    caracteristiques: [{
        type: String,
        required: true,
        trim: true,
    }],

    idEspece: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Espece',
        required: true
    },
});

const VarieteModel: Model<TypeVariete> = mongoose.model<TypeVariete>('Genre', VarieteSchema);

export default VarieteModel;
