import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeImagePlante extends Document {
    plante: mongoose.Types.ObjectId;
    url: string;
    description: string;
    sante: boolean;
    parasite: mongoose.Types.ObjectId[];
 
}

const ImagePlanteSchema: Schema<TypeImagePlante> = new Schema({   

    plante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plante',
        required: true
    },
    url: {
        type: String,
        required: true,
        trim: true,        
    },
    description: {
        type: String,
        required: true,
        trim: true,         
    },
    sante: { 
        type: Boolean, 
        required: true 
    },
    parasite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parasite',
        required: false
    }]
});

const ImagePlanteModel: Model<TypeImagePlante> = mongoose.model<TypeImagePlante>('ImagePlante', ImagePlanteSchema);

export default ImagePlanteModel;
