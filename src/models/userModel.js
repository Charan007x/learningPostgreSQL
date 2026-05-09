import pool from '../config/db.js';

export const getAllUsers=async()=>{
        const result=await pool.query('SELECT * FROM users');
        return result.rows;
};

export const getUserById=async(id)=>{
        const result=await pool.query('SELECT * FROM users WHERE id=$1',[id]);
        if(result.rows.length===0){
            throw new Error('User not found');
        }
        return result.rows[0];
};

export const createUser=async(username,email,phn,password)=>{
        const result=await pool.query(
            'INSERT INTO users (username,email,phn,password) VALUES ($1,$2,$3,$4) RETURNING *',
            [username,email,phn,password]
        );
        return result.rows[0];
};

export const findUserByUsername=async(username)=>{
        const result=await pool.query('SELECT * FROM users WHERE username=$1',[username]);
        return result.rows[0];
};
