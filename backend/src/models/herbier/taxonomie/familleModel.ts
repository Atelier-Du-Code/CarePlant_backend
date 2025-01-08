import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeFamille extends Document {
    nom: String;
    description: String;
 
}

const FamilleSchema: Schema<TypeFamille> = new Schema({
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

const FamilleModel: Model<TypeFamille> = mongoose.model<TypeFamille>('Famille', FamilleSchema);

export default FamilleModel;
