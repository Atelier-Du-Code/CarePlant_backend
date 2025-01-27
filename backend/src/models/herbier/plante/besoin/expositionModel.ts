import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeExposition extends Document {
    nom: String;
    description: String;
 
}

const ExpositionSchema: Schema<TypeExposition> = new Schema({
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

const ExpositionModel: Model<TypeExposition> = mongoose.model<TypeExposition>('Exposition', ExpositionSchema);

export default ExpositionModel;
