import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeBesoins extends Document {
    luminositeIntensite: 'vive'|'lumineuse'|'mi-ombre'|'ombre';
    luminositeType: 'directe'|'indirecte';
    tauxHumidite: 'forte'|'moyenne'|'faible';
    arrosage: mongoose.Types.ObjectId[];
    tempMin: number;
    tempMax: number;
    astuces: String[];
}

const BesoinsSchema: Schema<TypeBesoins> = new Schema({

    luminositeIntensite: { 
        type: String, 
        enum: ['vive', 'lumineuse', 'mi-ombre', 'ombre'], 
        required: true 
    },

    luminositeType: { 
        type: String, 
        enum: ['directe', 'indirecte'], 
        required: true 
    },

    tauxHumidite: { 
        type: String, 
        enum: ['forte', 'moyenne', 'faible'],
        required: true 
    },

    arrosage: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Arrosage',
        required: true
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
        type: String,
        required: true,
        trim: true,         
    }]

});

const BesoinsModel: Model<TypeBesoins> = mongoose.model<TypeBesoins>('Besoins', BesoinsSchema);

export default BesoinsModel;
