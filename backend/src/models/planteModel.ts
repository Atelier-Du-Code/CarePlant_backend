import mongoose, { Document, Schema, Model } from 'mongoose';

//Définition du type
export interface TypePlante extends Document {
    nomCommun: string;
    nomScientifique: string;
    description: string;
    toxicite: boolean;

    emplacement: mongoose.Types.ObjectId;
    modeCulture: mongoose.Types.ObjectId;
    besoins: mongoose.Types.ObjectId;

    famille: mongoose.Types.ObjectId;
    genre: mongoose.Types.ObjectId;
    espece: mongoose.Types.ObjectId;
    variete: mongoose.Types.ObjectId;

    morphologie: mongoose.Types.ObjectId;
    origine: mongoose.Types.ObjectId;  

    sols: mongoose.Types.ObjectId[];   
    images: mongoose.Types.ObjectId[];
   
}

//Définition du schéma
const PlanteSchema: Schema<TypePlante> = new Schema({
    nomCommun: { 
        type: String, 
        trim: true,
        required: true 
    },
    nomScientifique: { 
        type: String, 
        trim: true,
        required: true 
    },
    description: { 
        type: String, 
        trim: true,
        required: true 
    },
    toxicite: { 
        type: Boolean,   
        required: true 
    },
        
    famille: { 
        type: Schema.Types.ObjectId, 
        ref: "Famille", 
        required: true 
    },
    genre: { 
        type: Schema.Types.ObjectId, 
        ref: "Genre", 
        required: true 
    },
    espece: { 
        type: Schema.Types.ObjectId, 
        ref: "Espece", 
        required: true 
    },
    variete: { 
        type: Schema.Types.ObjectId, 
        ref: "Variete",
        required: true
    },
    morphologie: { 
        type: Schema.Types.ObjectId, 
        ref: "Morphologie", 
        required: true 
    },
    origine: { 
        type: Schema.Types.ObjectId, 
        ref: "Origine", 
        required: true 
    },
    sols: [{ 
        type: Schema.Types.ObjectId, 
        ref: "TypeSol" 
    }],
    besoins: { 
        type: Schema.Types.ObjectId, 
        ref: "Besoin", 
        required: true 
    },
    images: [{ 
        type: Schema.Types.ObjectId, 
        ref: "ImagePlante" 
    }],
   
})


// Définition du modèle
const PlanteModel: Model<TypePlante> = mongoose.model<TypePlante>('Plante', PlanteSchema);

export default PlanteModel;
