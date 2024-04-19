import mongoose from "mongoose";

interface CommentModel{
    name: string,
    comment: string 
}

const commentSchema = new mongoose.Schema<CommentModel>({
    name: {type: String, required: true},
    comment: {type: String, required: true}
})

const commentModel = mongoose.model('comment', commentSchema);
export default commentModel;