
import mongoose from "mongoose";

interface SubscribeModel{
    email: String
}

const subscribeSchema = new mongoose.Schema<SubscribeModel>({
    email: {type: String}
})

const SubscribeModel = mongoose.model('Subscriber', subscribeSchema);
export default SubscribeModel

