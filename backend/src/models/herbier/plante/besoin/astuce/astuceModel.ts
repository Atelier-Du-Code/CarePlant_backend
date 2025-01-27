import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeAstuce extends Document {
    astuceType: mongoose.Types.ObjectId;
    nom: String;
    description: String;
 
}

const AstuceSchema: Schema<TypeAstuce> = new Schema({
    astuceType: { 
        type: Schema.Types.ObjectId, 
        ref: "typeAstuce",
        required: true 
    },
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

const AstuceModel: Model<TypeAstuce> = mongoose.model<TypeAstuce>('Astuce', AstuceSchema);

export default AstuceModel;
