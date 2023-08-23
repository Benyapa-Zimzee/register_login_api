import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb+srv://Admin:1234@cluster0.nqpjo81.mongodb.net/Login')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});