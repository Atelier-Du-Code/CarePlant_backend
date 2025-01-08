import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeFrequenceArrosage extends Document {
    nbJours: Number;
    libelle: String;
 
}

const FrequenceArrosageSchema: Schema<TypeFrequenceArrosage> = new Schema({
    nbJours: {
        type: Number,
        required: true,
        trim: true,       
    },
    libelle: {
        type: String,
        required: false,
        trim: true,
    },
});

const FrequenceArrosageModel: Model<TypeFrequenceArrosage> = mongoose.model<TypeFrequenceArrosage>('FrequenceArrosage', FrequenceArrosageSchema);

export default FrequenceArrosageModel;
