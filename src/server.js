import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app=express();
import pool from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import userRoutes from './routes/userRoutes.js';
import urlRoutes from './routes/urlRoutes.js';
import redisClient from './config/redis.js';
//middleware
app.use(express.json());

//routes
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/urls', urlRoutes);

//error handling middleware
app.use(errorHandler);

// listening to the server
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});