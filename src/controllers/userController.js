import * as userService from '../models/userModel.js';

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
        const newUser=await userService.createUser(username,email,phn,password);
        res.status(201).json(newUser);
    }catch(err){
        next(err);
    }
};