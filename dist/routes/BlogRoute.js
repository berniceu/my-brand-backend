"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BlogController_1 = require("../controllers/BlogController");
const route = express_1.default.Router();
route.post('/createBlog', BlogController_1.createBlog);
route.get('/getBlog/:id', BlogController_1.getBlog);
route.get('/getAllBlogs', BlogController_1.getAllBlogs);
route.put('/updateBlog/:id', BlogController_1.updateBlog);
route.delete('/deleteBlog/:id', BlogController_1.deleteBlog);
route.post('/addLike', BlogController_1.addLike);
route.post('/addComment/:id', BlogController_1.addComment);
route.get('/getComment/:id', BlogController_1.getComment);
const blogRoute = module.exports = route;
exports.default = blogRoute;
