import { Request, Response } from 'express';
import BlogModel from '../models/BlogModel';
import CommentModel from '../models/CommentModel';
import dotenv from 'dotenv';
import uploader from '../cloudinary/cloudinary';
import upload from '../cloudinary/multer';
import fs from 'fs';


dotenv.config();

// create new blog

export const createBlog = async(req: Request, res: Response) => {
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

// get blog by id

export const getBlog = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        
        const blog = await BlogModel.findById(id);
        res.status(200).json(blog);

    } catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
}


// get all blogs

export const getAllBlogs = async(req: Request, res: Response) => {
    try{
        const blogs = await BlogModel.find({});
        res.status(200).json(blogs);

    } catch(err){
        console.log(err)
        return res.status(400).json(err);
    }
}

// update blog by id

export const updateBlog = async(req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const blog = await BlogModel.findByIdAndUpdate(id);
        const updatedBlog = await BlogModel.findById(id);
        res.status(200).json(updatedBlog);

    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

// delete blog by id

export const deleteBlog = async(req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const blog = await BlogModel.findByIdAndDelete(id);
        res.status(200).json(blog); 

    } catch(err){
        console.log(err);
        res.status(400).json(err);
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
        res.status(400).json(err)
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
        const comment = await BlogModel.findById(id);
        res.status(200).send(comment);

    } catch(err){
        res.status(500).json({message: 'failed to get comments'});
    }
}


