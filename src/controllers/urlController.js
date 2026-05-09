import jwt from 'jsonwebtoken';
import * as urlService from '../models/urlModel.js';
export const createShortUrl=async(req,res,next)=>{
    const { originalUrl, shortUrl } = req.body;
    const userId = req.user.id;
    try {
        const url = await urlService.createShortUrl(userId, originalUrl, shortUrl);
        res.status(201).json(url);
    } catch (error) {
        next(error);
    }
};

export const getUrlByShortUrl=async(req,res,next)=>{
    const { shortUrl } = req.params;
    try {
        const url = await urlService.getUrlByShortUrl(shortUrl);
        res.redirect(url.original_url); // redirect to the original URL
    }catch (error) {
        next(error);
    }
};