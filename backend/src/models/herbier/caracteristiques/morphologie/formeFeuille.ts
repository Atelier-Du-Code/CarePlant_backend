import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeFormeFeuille extends Document {
    nom: String;
    description: String;
 
}

const FormeFeuilleSchema: Schema<TypeFormeFeuille> = new Schema({
    nom: {
        type: String,
        required: true,
        trim: true,       
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
});

const FormeFeuilleModel: Model<TypeFormeFeuille> = mongoose.model<TypeFormeFeuille>('FormeFeuille', FormeFeuilleSchema);

export default FormeFeuilleModel;
