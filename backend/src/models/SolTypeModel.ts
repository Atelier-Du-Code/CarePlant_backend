import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeSolType extends Document {
    idSolType: mongoose.Types.ObjectId;


    nom: String;
    description: String;
    caracteristiques: String[];
    idEspece: mongoose.Types.ObjectId;
 
}

const SolTypeSchema: Schema<TypeSolType> = new Schema({
    idSolType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SolType',
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
});

const SolTypeModel: Model<TypeSolType> = mongoose.model<TypeSolType>('SolType', SolTypeSchema);

export default SolTypeModel;
