import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeEspece extends Document {
    nom: string;
    genre: mongoose.Types.ObjectId;
    description: string; 
}

const EspeceSchema: Schema<TypeEspece> = new Schema({
    nom: { 
        type: String, 
        required: true,
        trim: true,
    },
    genre: { 
        type: Schema.Types.ObjectId, 
        ref: "Genre", 
        required: true 
    },
    description: { 
        type: String,
        required: false,
        trim: true,
    },
});

const EspeceModel: Model<TypeEspece> = mongoose.model<TypeEspece>('Espece', EspeceSchema);

export default EspeceModel;
