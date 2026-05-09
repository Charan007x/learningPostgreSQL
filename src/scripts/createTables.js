import pool from '../config/db.js';

const createUserTables = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                phn CHAR(10) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
        console.log('Tables created successfully');
    } catch (err) {
        console.error('Error creating tables', err.stack);
    }
};

const createUrlTables = async () => {
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS urls (
                id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
                original_url TEXT NOT NULL,
                short_url VARCHAR(255) NOT NULL UNIQUE,
                clicks BIGINT DEFAULT 0,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
        console.log('URL table created successfully');
    }catch(err){
        console.error('Error creating tables', err.stack);
    }
};

createUserTables();
createUrlTables();