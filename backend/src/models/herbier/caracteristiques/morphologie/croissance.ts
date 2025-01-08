import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeCroissance extends Document {
    nom: String;
    description: String;
 
}

const CroissanceSchema: Schema<TypeCroissance> = new Schema({
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

const CroissanceModel: Model<TypeCroissance> = mongoose.model<TypeCroissance>('Croissance', CroissanceSchema);

export default CroissanceModel;
