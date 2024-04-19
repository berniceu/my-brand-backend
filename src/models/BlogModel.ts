import mongoose from 'mongoose';

interface BlogModel{
    blogTitle: string,
    blog: string,
    blogImage: string,
    author: string,
    likes: number
}

const BlogSchema = new mongoose.Schema<BlogModel>({
    blogTitle: {type: String, required: true},
    blog:{type:String, required: true},
    blogImage: {type:String, required: true},
    author:{type: String, required: true},
    likes: {type: Number, default: 0},
}, {timestamps: true});

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel