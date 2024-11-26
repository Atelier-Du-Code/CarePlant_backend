import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeGenre extends Document {
    idGenre: mongoose.Types.ObjectId;
    nom: String;
    description: String;
    idFamille: mongoose.Types.ObjectId;
 
}

const GenreSchema: Schema<TypeGenre> = new Schema({
    idGenre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
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

    idFamille: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Famille',
        required: true
    },
});

const GenreModel: Model<TypeGenre> = mongoose.model<TypeGenre>('Genre', GenreSchema);

export default GenreModel;
