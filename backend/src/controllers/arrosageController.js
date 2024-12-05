"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArrosageById = exports.getAllArrosages = void 0;
const arrosageModel_1 = __importDefault(require("../models/arrosageModel"));
// Récupérer tous les Arrosages
const getAllArrosages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arrosages = yield arrosageModel_1.default.find();
        if (arrosages.length == 0) {
            res.status(404).json({ message: "Aucun arrosage trouvé" });
            return;
        }
        res.status(200).json(arrosages);
    }
    catch (error) {
        if (error instanceof Error) {
            // Vérification de l'erreur MongoDB
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            }
            else {
                res.status(500).json({ message: 'Erreur lors de la récupération des arrosages' });
            }
        }
        else {
            res.status(500).json({ message: 'Erreur inconnue' });
        }
    }
});
exports.getAllArrosages = getAllArrosages;
// Récupérer Arrosage par ID
const getArrosageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const arrosage = yield arrosageModel_1.default.findById(id);
        if (!arrosage) {
            res.status(404).json({ message: 'Arrosage non trouvé' });
            return;
        }
        res.status(200).json(arrosage);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
            }
            else {
                res.status(500).json({ message: 'Erreur lors de la récupération de l\'arrosage' });
            }
        }
        else {
            res.status(500).json({ message: 'Erreur inconnue lors de la récupération de l\'arrosage' });
        }
    }
});
exports.getArrosageById = getArrosageById;
const arrosageController = {
    getAllArrosages: exports.getAllArrosages,
    getArrosageById: exports.getArrosageById
};
exports.default = arrosageController;
