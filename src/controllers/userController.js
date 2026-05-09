import * as userService from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const getAllUsers=async(req,res,next)=>{
    try{
        const users=await userService.getAllUsers();
        res.status(200).json(users);
    }catch(err){
        next(err);
    }
};

export const getUserById=async(req,res,next)=>{
    try{
        const id=parseInt(req.params.id);
        const user=await userService.getUserById(id);
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
};

export const createUser=async(req,res,next)=>{
    try{
        const {username,email,phn,password}=req.body;
        if(!username || !email || !phn || !password){
            return res.status(400).json({message:'All fields are required'});
        }
        const newPassword=await bcrypt.hash(password,10);
        const newUser=await userService.createUser(username,email,phn,newPassword);
        res.status(201).json(newUser);
    }catch(err){
        next(err);
    }
};

export const loginUser=async(req,res,next)=>{
    try{
        const {username,password}=req.body;
        if(!username || !password){
            return res.status(400).json({message:'Username and password are required'});
        }
        const user=await userService.findUserByUsername(username);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:'Invalid credentials'});
        }
        const token=jwt.sign({id:user.id,username:user.username},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({message:'Login successful',token});
    }catch(err){
        next(err);
    }
};