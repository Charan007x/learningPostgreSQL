import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import * as urlController from '../controllers/urlController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
router.post('/shorten', authenticateToken,urlController.createShortUrl);
router.get('/:shortUrl', urlController.getUrlByShortUrl);

export default router;