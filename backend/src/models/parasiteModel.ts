import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeParasite extends Document {
    nom: String;
    description: String;
    url: String,
 
}

const ParasiteSchema: Schema<TypeParasite> = new Schema({  
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
    url:[{
        type: String,
        required: true,
        trim: true,
        lowercase: true,   
    }]
});

const ParasiteModel: Model<TypeParasite> = mongoose.model<TypeParasite>('Parasite', ParasiteSchema);

export default ParasiteModel;
