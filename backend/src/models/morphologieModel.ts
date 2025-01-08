import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeMorphologie extends Document {
    formesGenerales: mongoose.Types.ObjectId;
    formesFeuilles: mongoose.Types.ObjectId; 
    textures: mongoose.Types.ObjectId[];       
    couleurs: mongoose.Types.ObjectId[];     
    taillesMax: number;                    
    croissances: mongoose.Types.ObjectId;       
}

const MorphologieSchema: Schema<TypeMorphologie> = new Schema({
    formesGenerales: { 
        type: Schema.Types.ObjectId, 
        ref: "FormeGenerale", 
        required: true 
    },
    formesFeuilles: { 
        type: Schema.Types.ObjectId, 
        ref: "FormeFeuille", 
        required: true 
    },
    textures: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Texture", 
        required: true 
    }],
    couleurs: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Couleur", 
        required: true 
    }],
    taillesMax: { 
        type: Number, 
        required: true 
    },
    croissances: {  
        type: Schema.Types.ObjectId, 
        ref: "Croissance", 
        required: true 
    },
});

const MorphologieModel: Model<TypeMorphologie> = mongoose.model<TypeMorphologie>('Morphologie', MorphologieSchema);

export default MorphologieModel;
