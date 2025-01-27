import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeEmplacement extends Document {
    nom: String;
    description: String;
}

const EmplacementSchema: Schema<TypeEmplacement> = new Schema({
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

const EmplacementModel: Model<TypeEmplacement> = mongoose.model<TypeEmplacement>('Emplacement', EmplacementSchema);

export default EmplacementModel;
