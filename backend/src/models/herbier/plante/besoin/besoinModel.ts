import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeBesoins extends Document {
    exposition: mongoose.Types.ObjectId[];
    diffusionLumiere:  mongoose.Types.ObjectId[];
    tauxHumidite: mongoose.Types.ObjectId;
    arrosages: mongoose.Types.ObjectId[];
    tempMin: number;
    tempMax: number;
    astuces: mongoose.Types.ObjectId[];
}

const BesoinsSchema: Schema<TypeBesoins> = new Schema({

    exposition: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Exposition",
        required: true 
    }],
    diffusionLumiere: [{ 
        type: Schema.Types.ObjectId, 
        ref: "TypeLumiere",
        required: true 
    }],
    tauxHumidite: { 
        type: Schema.Types.ObjectId, 
        ref: "TauxHumidite",
        required: true 
    },
    arrosages: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Arrosage" 
    }],
    tempMin: { 
        type: Number, 
        required: true 
    },
    tempMax: { 
        type: Number, 
        required: true 
    },
    astuces: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Astuce" 
    }],

});

const BesoinsModel: Model<TypeBesoins> = mongoose.model<TypeBesoins>('Besoins', BesoinsSchema);

export default BesoinsModel;
