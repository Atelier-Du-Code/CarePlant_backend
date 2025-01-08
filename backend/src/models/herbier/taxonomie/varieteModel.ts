import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeVariete extends Document {
    nom: string;
    espece: mongoose.Types.ObjectId;
    description: string;
}

const VarieteSchema: Schema<TypeVariete> = new Schema({
    nom: { 
        type: String, 
        required: true,
        trim: true,
    },
    espece: { 
        type: Schema.Types.ObjectId, 
        ref: "Espece", 
        required: true 
    },
    description: { 
        type: String, 
        required: false,
        trim: true,
    },
});

const VarieteModel: Model<TypeVariete> = mongoose.model<TypeVariete>('Variete', VarieteSchema);

export default VarieteModel;
