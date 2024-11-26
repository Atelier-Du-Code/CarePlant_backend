import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeParasite extends Document {
    idParasite: mongoose.Types.ObjectId;
    nom: String;
    description: String;
    idGenre: mongoose.Types.ObjectId;
 
}

const ParasiteSchema: Schema<TypeParasite> = new Schema({
    idParasite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parasite',
        required: true
    },

    nom: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,       
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,       
    },
});

const ParasiteModel: Model<TypeParasite> = mongoose.model<TypeParasite>('Genre', ParasiteSchema);

export default ParasiteModel;
