import { Request, Response } from 'express';
import BlogModel from '../models/BlogModel';
import CommentModel from '../models/CommentModel';
import dotenv from 'dotenv';
import fs from 'fs'

dotenv.config();

const newBlog = async(req: Request, res: Response) => {
    try{
        if(!req.file){
            return res.status(400).json( {error: "No file uploaded"});
        }
    }
}