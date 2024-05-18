import { Request, Response } from 'express';
import BlogModel from '../models/BlogModel';
import CommentModel from '../models/CommentModel';
import dotenv from 'dotenv';
const cloudinary = require('cloudinary').v2;
import fs from 'fs';
import multer from 'multer';
import commentModel from '../models/CommentModel';
import path from 'path';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploadPath = path.resolve(__dirname, 'uploads/');
if (!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

export const upload = multer( {storage: storage});



// create new blog

export const createBlog = async(req: Request, res: Response) => {

    try{
        console.log(req.file);
        console.log(req.body);

        if(!req.file){
            return res.status(400).json( {error: "No file uploaded"});
        }
        const result = await cloudinary.uploader.upload(req.file.path);

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
        return res.status(500).json({message: 'blog not created'})
    }
}

// get blog by id

export const getBlog = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        
        const blog = await BlogModel.findById(id);
        res.status(200).json(blog);

    } catch(err){
        console.log(err)
        return res.status(500).json({message: 'failed to get blog'})
    }
}


// get all blogs

export const getAllBlogs = async(req: Request, res: Response) => {
    try{
        const blogs = await BlogModel.find({});
        res.status(200).json(blogs);

    } catch(err){
        console.log(err)
        return res.status(500).json({messsage: 'failed to get blogs'});
    }
}

// update blog by id

export const updateBlog = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const blogExist = await BlogModel.findOne({ _id: id });
      if (!blogExist) {
        return res.status(404).json({ message: "Blog Not found" });
      }
      let updateData = req.body;
  
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file, res);
        updateData.blogImage = result.secure_url;
      }
      const updateBlog = await BlogModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      res.status(201).json(updateBlog);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

// delete blog by id

export const deleteBlog = async(req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const blog = await BlogModel.findByIdAndDelete(id);
        res.status(200).json(blog); 

    } catch(err){
        console.log(err);
        res.status(500).json({message: 'failed to delete blog'});
    }
}

// add like
export const addLike = async(req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const { userAction } = req.body;
        const blog: any = await BlogModel.findById(id);

        if(userAction == 'like'){
            blog.likes++;
        } else {
            if (blog.likes > 0){
                blog.likes--;
            }
        }

        await blog.save();
        res.status(200).json({ message: "Added like successfully"})



    } catch(err){
        console.log(err);
        res.status(500).json({message: "failed to add like"})
    }
}

// add comment

export const addComment = async(req: Request, res:Response) => {
    try{
        const { id } = req.params;

        const comment = await CommentModel.create({...req.body, blogId: id});
        res.status(200).json({message: "comment added successfully"});

    }catch(err){
        res.status(500).json({message: 'failed to comment'});
    }
}

// get comment

export const getComment = async(req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const comments = await commentModel.find({blogId: id});
        res.status(200).send(comments);

    } catch(err){
        res.status(500).json({message: 'failed to get comments'});
    }
}


// delete comment
export const deleteComment = async(req: Request, res:Response) => {
    try{
        const{ id } = req.params;
        const comment = await commentModel.findByIdAndDelete(id);
        res.status(200).send({message: 'Comment deleted successfully'});
    } catch(err){
        res.status(500).json({message: 'failed to delete comment'})
    }
}

