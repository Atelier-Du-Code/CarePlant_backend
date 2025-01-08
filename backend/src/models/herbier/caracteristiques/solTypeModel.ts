import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeSolType extends Document {
    type: string;
    description: string;    
}

const SolTypeSchema: Schema<TypeSolType> = new Schema({
    type: {
        type: String,
        required: true,
        trim: true,
             
    },
    description: {
        type: String,
        required: true,
        trim: true,     
    },
});

const SolTypeModel: Model<TypeSolType> = mongoose.model<TypeSolType>('SolType', SolTypeSchema);

export default SolTypeModel;
