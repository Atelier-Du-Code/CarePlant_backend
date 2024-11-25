import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeImagePlante extends Document {
    idImagePlante: mongoose.Types.ObjectId;
    idPlante: mongoose.Types.ObjectId;
    url: String;
    description: String;
 
}

const ImagePlanteSchema: Schema<TypeImagePlante> = new Schema({
    idImagePlante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ImagePlante',
        required: true
    },

    idPlante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plante',
        required: true
    },

    url: {
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

const ImagePlanteModel: Model<TypeImagePlante> = mongoose.model<TypeImagePlante>('ImagePlante', ImagePlanteSchema);

export default ImagePlanteModel;
