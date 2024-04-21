"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BlogController_1 = require("../controllers/BlogController");
const route = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     blog:
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
 *           type: integer
 *           description: number of likes on the blog
 */
/**
 * @swagger
 * /blogs/getAllBlogs:
 *   get:
 *     summary: get all blogs from mongodb
 *     description: This api is used to get all blogs from mongodb
 *     responses:
 *       200:
 *         description: Get data from mongodb
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blog'
 *       500:
 *          description: failed to get blogs
 *
 */
/**
 * @swagger
 * /blogs/createBlog:
 *   post:
 *     summary: create new blog
 *     description: this api is used to create and post blogs to mongodb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/blog'
 *     responses:
 *       200:
 *         description: blog added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blog'
 *       400:
 *         description: No file uploaded
 *
 *       500:
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
 *       200:
 *         description: Get blog from mongodb
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blogs'
 *       500:
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
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/blogs'
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/blogs'
 *       500:
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
 *       200:
 *         description: blog deleted successfully
 *       500:
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
 *       200:
 *         description: comment added successfully
 *
 *       500:
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
 *       200:
 *         description: comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Commenter's name
 *                   text:
 *                     type: string
 *                     description: Comment text
 *       500:
 *         description: failed to get comments
 */
/**
 * @swagger
 * /blogs/addLike/{id}:
 *   post:
 *     summary: Add a like to a blog by ID
 *     tags:
 *       - Blogs
 *     description: This endpoint adds a like to a blog using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Blog ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 description: Like action
 *     responses:
 *       200:
 *         description: added like successfully
 *       500:
 *         description: failed to add like
 */
route.post("/createBlog", BlogController_1.upload.single("blogImage"), BlogController_1.createBlog);
route.get("/getBlog/:id", BlogController_1.getBlog);
route.get("/getAllBlogs", BlogController_1.getAllBlogs);
route.put("/updateBlog/:id", BlogController_1.updateBlog);
route.delete("/deleteBlog/:id", BlogController_1.deleteBlog);
route.post("/addLike/:id", BlogController_1.addLike);
route.post("/addComment/:id", BlogController_1.addComment);
route.get("/getComment/:id", BlogController_1.getComment);
const blogRoute = (module.exports = route);
exports.default = blogRoute;
