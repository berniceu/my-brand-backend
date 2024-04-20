"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BlogSchema = new mongoose_1.default.Schema({
    blogTitle: { type: String, required: true },
    blog: { type: String, required: true },
    blogImage: { type: String, required: true },
    author: { type: String, required: true },
    likes: { type: Number, default: 0 },
}, { timestamps: true });
const BlogModel = mongoose_1.default.model("Blog", BlogSchema);
module.exports = BlogModel;
exports.default = BlogModel;
