import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes/index';
import dotenv from 'dotenv';
//import errorMiddleware from './middleware/errorMiddleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

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

// Routes
app.use('/api', routes);
//app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
