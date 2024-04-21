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
 *         blogImage:
 *           type: string
 *           description: image of the blog
 *         likes:
 *           type: number
 *           description: number of likes on the blog
 */



/**
 * @swagger
 * /blogs/getAllBlogs:
 *   get:
 *     summary: get all blogs from mongodb
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
 *       '500':
 *          description: failed to get blogs
 *             
 */

/**
 * @swagger
 * /blogs/createBlog:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blogs'
 * 
 *       '500':
 *         description: blog deleted successfully
 */

/**
 * @swagger
 * /blogs/getBlog/{id}:
 *   get:
 *     summary: get blog from mongodb using id
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
 *       '500':
 *         description: failed to get blog
 */

/**
 * @swagger
 * /blogs/updateBlog/{id}:
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
 *       '500':
 *         description: failed to update blog
 */

/**
 * @swagger
 * /blogs/deleteBlog/{id}:
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
 *       '500':
 *         description: failed to delete blog
 */

/**
 * @swagger
 * /blogs/addComment/{id}:
 *   post:
 *     summary: add comment to blog post
 *     description: This api is used to post a comment on a blog using blog id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID required
 *         schema: 
 *           type: string
 * 
 *     requestBody:
 *         description: comment data
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: name of commenter
 *                 text:
 *                   type: string
 *                   dexcription: comment
 *               
 *     responses:
 *       '200':
 *         description: comment added successfully
 * 
 *       '500':
 *         description: failed to comment
 */

/**
 * @swagger
 * /blogs/getComment/{id}:
 *   get:
 *     summary: get blogpost comments
 *     description: This api is used to get blogpost comments using blog id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID required
 *         schema: 
 *           type: string              
 *     responses:
 *       '200':
 *         description: get comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 text:
 *                   type: string
 *                  
 * 
 *       '500':
 *         description: failed to get comments
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


