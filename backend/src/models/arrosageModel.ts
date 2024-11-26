import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeArrosage extends Document {   
    frequence: 1|2|3|7|14|21|28|31;
    saison: 'printemps'|'été'|'automne'|'hiver';
}

const ArrosageSchema: Schema<TypeArrosage> = new Schema({   
    frequence: { 
        type: Number, 
        enum: [1, 2, 3, 7, 14, 21, 28, 31], 
        required: true 
    },

    saison: { 
        type: String, 
        enum: ['printemps', 'été', 'automne', 'hiver'], 
        required: true 
    },
});

const ArrosageModel: Model<TypeArrosage> = mongoose.model<TypeArrosage>('Arrosage', ArrosageSchema);

export default ArrosageModel;
