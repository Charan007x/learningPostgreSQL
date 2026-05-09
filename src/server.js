import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app=express();
import pool from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import userRoutes from './routes/userRoutes.js';

//middleware
app.use(express.json());
app.use(errorHandler);

//routes
app.use('/api/v1/users',userRoutes);


// listening to the server
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});