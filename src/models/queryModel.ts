import mongoose from "mongoose";

interface queryModel{
    name: string,
    email: string,
    query: string
}

const querySchema = new mongoose.Schema<queryModel>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    query: {type: String, required: true}
})

const queryModel = mongoose.model('query', querySchema);
module.exports = queryModel