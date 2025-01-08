import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeGenre extends Document {
    nom: string;
    famille: mongoose.Types.ObjectId;
    description: string;
 
}

const GenreSchema: Schema<TypeGenre> = new Schema({
    nom: { 
        type: String, 
        required: true,
        trim: true,
    },
    famille: { 
        type: Schema.Types.ObjectId, 
        ref: "Famille", 
        required: true,
        trim: true,
    },
    description: { 
        type: String,
        required: false,
        trim: true,
    },
});

const GenreModel: Model<TypeGenre> = mongoose.model<TypeGenre>('Genre', GenreSchema);

export default GenreModel;
