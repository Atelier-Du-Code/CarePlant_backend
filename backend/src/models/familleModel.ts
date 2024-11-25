import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeFamille extends Document {
    idFamille: mongoose.Types.ObjectId;
    nom: String;
    description: String;
 
}

const FamilleSchema: Schema<TypeFamille> = new Schema({
    idFamille: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Famille',
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

const FamilleModel: Model<TypeFamille> = mongoose.model<TypeFamille>('Famille', FamilleSchema);

export default FamilleModel;
