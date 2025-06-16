import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from './config/dbConnect.js';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
// Connect to the database
dbConnect()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection failed:', err));

const app = express();

//Middleware
app.use(express.json());


//Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

//start the server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
