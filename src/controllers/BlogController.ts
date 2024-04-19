import { Request, Response } from 'express';
import BlogModel from '../models/BlogModel';
import CommentModel from '../models/CommentModel';
import dotenv from 'dotenv';
import uploader from '../cloudinary/cloudinary';
import upload from '../cloudinary/multer';
import fs from 'fs';


dotenv.config();

const createBlog = async(req: Request, res: Response) => {
    try{
        if(!req.file){
            return res.status(400).json( {error: "No file uploaded"});
        }
        const result = await uploader(req.file, res);
        const { blogTitle, blog, author} = req.body;
        const blogData = new BlogModel({
            blogTitle,
            blog,
            blogImage: result.secure_url,
            author
        })

        const newBlog = await blogData.save();

        fs.unlinkSync(req.file.path);
        res.status(200).json(newBlog)

    } catch(err){
        console.log(err);
        return res.status(400).json(err)
    }
}

export default createBlog