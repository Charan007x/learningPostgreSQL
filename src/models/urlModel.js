import pool from '../config/db.js';

export const createShortUrl = async (userId, originalUrl, shortUrl) => {
    const result = await pool.query(
        'INSERT INTO urls (user_id, original_url, short_url) VALUES ($1, $2, $3) RETURNING *',
        [userId, originalUrl, shortUrl]
    );
    console.log(`URL is http://localhost:5001/${shortUrl}`);
    return result.rows[0];
};

export const getUrlByShortUrl = async (shortUrl) => {
    const result = await pool.query('SELECT * FROM urls WHERE short_url = $1', [shortUrl]);
    if (result.rows.length === 0) {
        throw new Error('URL not found');
    }
    await pool.query('UPDATE urls SET clicks = clicks + 1 WHERE short_url = $1', [shortUrl]);
    return result.rows[0];
};