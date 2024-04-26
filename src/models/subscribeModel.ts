
import mongoose from "mongoose";

interface Subscribe{
    email: string
}

const subscribeSchema = new mongoose.Schema<Subscribe>({
    email: {type: String, required: true}
})

const SubscribeModel = mongoose.model('Subscriber', subscribeSchema);
export default SubscribeModel

