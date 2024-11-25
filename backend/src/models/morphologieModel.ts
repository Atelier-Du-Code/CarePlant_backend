import mongoose, { Document, Schema, Model } from 'mongoose';

export interface TypeMorphologie extends Document {
    idPlante: mongoose.Types.ObjectId;
    formeGenerale: 'buisson'|'arbre'|'rampante'|'en cascade'|'verticale'|'compacte'|'grimpante';
    texture: 'lisse'|'rugueux'|'duveteux'|'scireux'|'velouté';
    couleur: 'vert'|'panaché vert/blanc'|'gris-argenté'|'bleu-argenté'|'vert-argenté'|'marbré'|'rougeâtre'|'bordeaux';
    formeFeuille: 'lancéolée'|'elliptique'|'ovale'|'spathulée'|'corde'|'ronde'|'circulaire'|'oblongue'|'triangulaire'|'falciforme';
    tailleMax: number;
    croissance: 'lente' | 'moyenne' | 'rapide'; 
}

const MorphologieSchema: Schema<TypeMorphologie> = new Schema({
    idPlante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plante',
        required: true
    },
    formeGenerale: { 
        type: String, 
        enum: ['buisson', 'arbre', 'rampante', 'en cascade', 'verticale', 'compacte', 'grimpante'], 
        required: true 
    },

    formeFeuille: { 
        type: String, 
        enum: ['lancéolée', 'elliptique', 'ovale', 'spathulée', 'corde', 'ronde', 'circulaire', 'oblongue', 'triangulaire', 'falciforme'], 
        required: true 
    },
 
    texture: {
        type: String, 
        enum: ['lisse', 'rugueux', 'duveteux', 'scireux', 'velouté'], 
        required: true 
    },

    couleur: {
        type: String, 
        enum: ['vert', 'panaché vert/blanc', 'gris-argenté', 'bleu-argenté', 'vert-argenté', 'marbré', 'rougeâtre', 'bordeaux'], 
        required: true 
    },
    tailleMax: { 
        type: Number, 
        required: true 
    },
    croissance: { 
        type: String, 
        enum: ['lente', 'moyenne', 'rapide'], 
        required: true 
    }
});

const MorphologieModel: Model<TypeMorphologie> = mongoose.model<TypeMorphologie>('Morphologie', MorphologieSchema);

export default MorphologieModel;
