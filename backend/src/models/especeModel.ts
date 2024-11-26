import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeEspece extends Document {
    idEspece: mongoose.Types.ObjectId;
    nom: String;
    description: String;
    idGenre: mongoose.Types.ObjectId;
 
}

const EspeceSchema: Schema<TypeEspece> = new Schema({
    idEspece: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Espece',
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

    idGenre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
});

const EspeceModel: Model<TypeEspece> = mongoose.model<TypeEspece>('Genre', EspeceSchema);

export default EspeceModel;
