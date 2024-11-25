import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeOrigine extends Document {
    idOrigine: mongoose.Types.ObjectId;
    nom: String;
    description: String;
    caracteristiques: String[];
 
}

const OrigineSchema: Schema<TypeOrigine> = new Schema({
    idOrigine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Origine',
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
});

const OrigineModel: Model<TypeOrigine> = mongoose.model<TypeOrigine>('Genre', OrigineSchema);

export default OrigineModel;
