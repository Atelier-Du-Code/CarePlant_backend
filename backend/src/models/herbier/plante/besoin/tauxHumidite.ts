import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeTauxHumidite extends Document {
    nom: String;
    description: String;
 
}

const TauxHumiditeSchema: Schema<TypeTauxHumidite> = new Schema({
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

const TauxHumiditeModel: Model<TypeTauxHumidite> = mongoose.model<TypeTauxHumidite>('TauxHumidite', TauxHumiditeSchema);

export default TauxHumiditeModel;
