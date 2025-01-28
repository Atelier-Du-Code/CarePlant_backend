import { Application } from 'express';

import mongoose from 'mongoose';
import routes from './routes/index';



const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

//import errorMiddleware from './middleware/errorMiddleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 10000;



// Middleware pour parser les requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB || '', { 
})
.then(() => {

  console.log('MongoDB connected successfully');
 
})
.catch((error) => {
  console.error('Failed to connect to MongoDB:', error.message);
});




// // Serve React app for production
// if (process.env.NODE_ENV === 'PROD') {
//   const frontendPath = path.join(__dirname, '../../frontend/build');
//   app.use(express.static(frontendPath));
  
  
// // Routes
// app.use('/api', routes);
// //app.use(errorMiddleware);

//   app.get('*', (req, res) => {
//     console.log('Démarrage du serveur...');
//     console.log(`Request received for ${req.url}`);
//     console.log('Env variables:', process.env); 


//     console.log(`port: ${PORT}`);
//     res.sendFile(path.resolve(frontendPath, 'index.html'));
 
//   });
// }

app.use(cors({
  origin: ['http://localhost:3000', 'http://careplantfront.portefolio.avaulleemanonportefolio.fr'] // Permet uniquement les requêtes depuis localhost:3000 et ton domaine
}));

// Routes
app.use('/api', routes);
//app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
