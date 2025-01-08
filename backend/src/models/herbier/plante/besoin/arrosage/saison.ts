import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeSaison extends Document {
    nom: String;
}

const SaisonSchema: Schema<TypeSaison> = new Schema({
    nom: {
        type: String,
        required: true,
        trim: true,       
    },   
});

const SaisonModel: Model<TypeSaison> = mongoose.model<TypeSaison>('Saison', SaisonSchema);

export default SaisonModel;
