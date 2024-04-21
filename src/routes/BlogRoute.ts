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

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog apis
 * 
 */

/**
 * @swagger
 * components: 
 *   schemas:
 *     blogs:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: unique identifier of the blog
 *         blogTitle:
 *           type: string
 *           description: title of the blog
 *         blog:
 *           type: string
 *           description: content of the blog
 *         author: 
 *           type: string
 *           description: author of the blog
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: fetch data from mongodb
 *     description: This api is used to get all blogs from mongodb
 *     responses:
 *       '200':
 *         description: Get data from mongodb
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blogs'
 */


/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: post blogs to mongodb
 *     description: this api is used to post blogs to mongodb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/blogs'
 *     responses:
 *       '200':
 *         description: blog added successfully.
 */


/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: fetch blog from mongodb using id
 *     description: This api is used to get a blog from mongodb using its id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID required
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Get blog from mongodb
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blogs'
 */

// update blog
/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: update blog in mongodb using id
 *     description: This api is used to update a blog in mongodb using its id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID required
 *         schema: 
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/blogs'                 
 *     responses:
 *       '200':
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blogs'
 */

// delete blog
/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: delete blog from mongodb using id
 *     description: This api is used to delete blog from mongodb using its id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID required
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: blog deleted successfully

 */
route.post('/createBlog', upload.single('blogImage'), createBlog);
route.get('/getBlog/:id', getBlog);
route.get('/getAllBlogs', getAllBlogs);
route.put('/updateBlog/:id', updateBlog);
route.delete('/deleteBlog/:id', deleteBlog);
route.post('/addLike/:id', addLike);
route.post('/addComment/:id', addComment);
route.get('/getComment/:id', getComment)

const blogRoute = module.exports = route
export default blogRoute;


