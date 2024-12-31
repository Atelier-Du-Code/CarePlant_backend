import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeSolType extends Document {
    nom: String;
    description: String;
    caracteristiques: String[];
}

const SolTypeSchema: Schema<TypeSolType> = new Schema({
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
});

const SolTypeModel: Model<TypeSolType> = mongoose.model<TypeSolType>('SolType', SolTypeSchema);

export default SolTypeModel;
