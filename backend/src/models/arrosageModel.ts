import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeArrosage extends Document {   
    frequence: mongoose.Types.ObjectId;
    saison: mongoose.Types.ObjectId;
}

const ArrosageSchema: Schema<TypeArrosage> = new Schema({   
    frequence: { 
        type: Schema.Types.ObjectId, 
        ref: "Arrosage",
        required: true 
    },
    saison: { 
        type: Schema.Types.ObjectId, 
        ref: "Saison",
        required: true 
    },
});

const ArrosageModel: Model<TypeArrosage> = mongoose.model<TypeArrosage>('Arrosage', ArrosageSchema);

export default ArrosageModel;
