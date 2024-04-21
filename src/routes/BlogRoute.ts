import express from 'express';
import {
    createBlog,
    getBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog,
    addLike,
    addComment,
    getComment,
    upload
} from '../controllers/BlogController';

const route = express.Router();

route.post('/createBlog', upload.single('blogImage'), createBlog);
route.get('/getBlog/:id', getBlog);
route.get('/getAllBlogs', getAllBlogs);
route.put('/updateBlog/:id', updateBlog);
route.delete('/deleteBlog/:id', deleteBlog);
route.post('/addLike', addLike);
route.post('/addComment/:id', addComment);
route.get('/getComment/:id', getComment)

const blogRoute = module.exports = route
export default blogRoute;


