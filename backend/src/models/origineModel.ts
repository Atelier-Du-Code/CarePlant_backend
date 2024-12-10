import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeOrigine extends Document {
    nom: String;
    description: String;
    caracteristiques: String[];
 
}

const OrigineSchema: Schema<TypeOrigine> = new Schema({
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
