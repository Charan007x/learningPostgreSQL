import jwt from 'jsonwebtoken';
import redisClient from '../config/redis.js';
import * as urlService from '../models/urlModel.js';
export const createShortUrl=async(req,res,next)=>{
    const { originalUrl, shortUrl } = req.body;
    const userId = req.user.id;
    try {
        const url = await urlService.createShortUrl(userId, originalUrl, shortUrl);

        // Store the URL in Redis
        await redisClient.setEx(shortUrl, 3600, originalUrl); // Expire after 1 hour

        res.status(201).json(url);
    } catch (error) {
        next(error);
    }
};

export const getUrlByShortUrl=async(req,res,next)=>{
    const { shortUrl } = req.params;
    try {
        
            const originalUrl=await redisClient.get(shortUrl);
            if(originalUrl) return res.redirect(originalUrl); // redirect to the original URL
        const url = await urlService.getUrlByShortUrl(shortUrl);
        await redisClient.setEx(shortUrl, 3600, url.original_url); // Cache the URL in Redis for future requests
        res.redirect(url.original_url); // redirect to the original URL
    }catch (error) {
        next(error);
    }
};