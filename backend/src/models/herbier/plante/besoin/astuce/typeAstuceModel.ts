import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeAstuceType extends Document {
    nom: String;
 
}

const AstuceTypeSchema: Schema<TypeAstuceType> = new Schema({
    nom: {
        type: String,
        required: true,
        trim: true,       
    },   
});

const AstuceTypeModel: Model<TypeAstuceType> = mongoose.model<TypeAstuceType>('AstuceType', AstuceTypeSchema);

export default AstuceTypeModel;
