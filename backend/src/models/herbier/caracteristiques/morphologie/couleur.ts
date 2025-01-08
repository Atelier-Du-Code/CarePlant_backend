import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeCouleur extends Document {
    nom: String;
    description: String;
 
}

const CouleurSchema: Schema<TypeCouleur> = new Schema({
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

const CouleurModel: Model<TypeCouleur> = mongoose.model<TypeCouleur>('Couleur', CouleurSchema);

export default CouleurModel;
