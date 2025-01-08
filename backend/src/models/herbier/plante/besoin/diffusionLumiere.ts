import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeDiffusionLumiere extends Document {
    nom: String;
    description: String;
 
}

const DiffusionLumiereSchema: Schema<TypeDiffusionLumiere> = new Schema({
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

const DiffusionLumiereModel: Model<TypeDiffusionLumiere> = mongoose.model<TypeDiffusionLumiere>('DiffusionLumiere', DiffusionLumiereSchema);

export default DiffusionLumiereModel;
