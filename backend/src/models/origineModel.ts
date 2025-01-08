import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeOrigine extends Document {
    nom: string;
    description: string;
 
}

const OrigineSchema: Schema<TypeOrigine> = new Schema({
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

const OrigineModel: Model<TypeOrigine> = mongoose.model<TypeOrigine>('Origine', OrigineSchema);

export default OrigineModel;
