"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComment = exports.addComment = exports.addLike = exports.deleteBlog = exports.updateBlog = exports.getAllBlogs = exports.getBlog = exports.createBlog = exports.upload = void 0;
const BlogModel_1 = __importDefault(require("../models/BlogModel"));
const CommentModel_1 = __importDefault(require("../models/CommentModel"));
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary = require('cloudinary').v2;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const CommentModel_2 = __importDefault(require("../models/CommentModel"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.resolve(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
// create new blog
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.file);
        console.log(req.body);
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const result = yield cloudinary.uploader.upload(req.file.path);
        const { blogTitle, blog, author } = req.body;
        const blogData = new BlogModel_1.default({
            blogTitle,
            blog,
            blogImage: result.secure_url,
            author
        });
        const newBlog = yield blogData.save();
        fs_1.default.unlinkSync(req.file.path);
        res.status(200).json(newBlog);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'blog not created' });
    }
});
exports.createBlog = createBlog;
// get blog by id
const getBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield BlogModel_1.default.findById(id);
        res.status(200).json(blog);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'failed to get blog' });
    }
});
exports.getBlog = getBlog;
// get all blogs
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield BlogModel_1.default.find({});
        res.status(200).json(blogs);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ messsage: 'failed to get blogs' });
    }
});
exports.getAllBlogs = getAllBlogs;
// update blog by id
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield BlogModel_1.default.findByIdAndUpdate(id);
        const updatedBlog = yield BlogModel_1.default.findById(id);
        res.status(200).json(updatedBlog);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'failed to update blog' });
    }
});
exports.updateBlog = updateBlog;
// delete blog by id
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield BlogModel_1.default.findByIdAndDelete(id);
        res.status(200).json(blog);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'failed to delete blog' });
    }
});
exports.deleteBlog = deleteBlog;
// add like
const addLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userAction } = req.body;
        const blog = yield BlogModel_1.default.findById(id);
        if (userAction == 'like') {
            blog.likes++;
        }
        else {
            if (blog.likes > 0) {
                blog.likes--;
            }
        }
        yield blog.save();
        res.status(200).json({ message: "Added like successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to add like" });
    }
});
exports.addLike = addLike;
// add comment
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const comment = yield CommentModel_1.default.create(Object.assign(Object.assign({}, req.body), { blogId: id }));
        res.status(200).json({ message: "comment added successfully" });
    }
    catch (err) {
        res.status(500).json({ message: 'failed to comment' });
    }
});
exports.addComment = addComment;
// get comment
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const comments = yield CommentModel_2.default.find({ blogId: id });
        res.status(200).send(comments);
    }
    catch (err) {
        res.status(500).json({ message: 'failed to get comments' });
    }
});
exports.getComment = getComment;
