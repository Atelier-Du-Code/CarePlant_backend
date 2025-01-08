import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeTexture extends Document {
    nom: String;
    description: String;
 
}

const TextureSchema: Schema<TypeTexture> = new Schema({
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

const TextureModel: Model<TypeTexture> = mongoose.model<TypeTexture>('Texture', TextureSchema);

export default TextureModel;
