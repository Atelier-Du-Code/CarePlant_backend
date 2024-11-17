import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes/index';
import dotenv from 'dotenv';
import path from 'path';
//import errorMiddleware from './middleware/errorMiddleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 1000;

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

// Serve React app for production
if (process.env.NODE_ENV === 'PROD') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}


// Routes
app.use('/api', routes);
//app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
