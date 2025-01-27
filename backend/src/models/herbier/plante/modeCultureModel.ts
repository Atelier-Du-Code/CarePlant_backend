import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeModeCulture extends Document {
    nom: String;
    description: String;
 
}

const ModeCultureSchema: Schema<TypeModeCulture> = new Schema({
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

const ModeCultureModel: Model<TypeModeCulture> = mongoose.model<TypeModeCulture>('ModeCulture', ModeCultureSchema);

export default ModeCultureModel;
