import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeFormeGenerale extends Document {
    nom: String;
    description: String;
 
}

const FormeGeneraleSchema: Schema<TypeFormeGenerale> = new Schema({
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

const FormeGeneraleModel: Model<TypeFormeGenerale> = mongoose.model<TypeFormeGenerale>('FormeGenerale', FormeGeneraleSchema);

export default FormeGeneraleModel;
