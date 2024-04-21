import { Request, Response } from 'express';
import userModel from '../models/UserModel';
import bcrypt from 'bcrypt';
import jwt from  'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const createUser = async(req: Request, res: Response) => {
    try{

        
        const { fullName, email, password } = req.body;

        if (fullName == '' && email == '' && password == ''){
            return res.status(401).json({message:'Please fill out all fields'});
            
        }
        const newUser = new userModel(req.body);
        newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
        const existingUser = await userModel.findOne({email: newUser.email})


        if (existingUser){
            return res.status(400).json({message: "User already exists"})
        } else{
            const savedUser = await newUser.save();
            res.status(200).json({message: "Signed up successfully"});
        }
    } catch(err){
        console.log(err);
        return res.status(500).json({message: "failed to sign up"})
    }
    


}  

export const loginUser = async (req: Request, res: Response) => {
    try{
        const { email, password} = req.body;
        const user = await userModel.findOne({ email});
        
        if(!user){
            return res.status(400).json({message: 'User does not exist'});
        }

        if (!bcrypt.compareSync(password, user.hash_password)){
            return res.status(401).json({message: "Incorrect password"});
        }

        const accessToken = jwt.sign({ email: user.email}, process.env.ACCESS_TOKEN_SECRET as string);
        res.status(200).json({message: "Logged in successfully"})

        

    } catch(err){
        console.log(err);
        return res.status(500). json({message: "failed to log in"})
    }
}