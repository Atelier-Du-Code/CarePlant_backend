"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
//import errorMiddleware from './middleware/errorMiddleware';
dotenv.config();
const app = express();
const PORT = process.env.PORT;
// Middleware pour parser les requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Connexion à MongoDB
mongoose_1.default.connect(process.env.MONGODB || '', {})
    .then(() => {
    console.log('MongoDB connected successfully');
})
    .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
});
// Serve React app for production
if (process.env.NODE_ENV === 'PROD') {
    const frontendPath = path.join(__dirname, '../../frontend/build');
    app.use(express.static(frontendPath));
    app.get('*', (req, res) => {
        console.log(`Request received for ${req.url}`);
        res.sendFile(path.resolve(frontendPath, 'index.html'));
    });
}
// Routes
app.use('/api', index_1.default);
//app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
