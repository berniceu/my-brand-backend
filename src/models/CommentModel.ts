import mongoose from "mongoose";

interface CommentModel{
    name: string,
    comment: string,
    blogId: string 
}

const commentSchema = new mongoose.Schema<CommentModel>({
    name: {type: String, required: true},
    comment: {type: String, required: true},
    blogId: {type: String}
})

const commentModel = mongoose.model('comment', commentSchema);
export default commentModel;