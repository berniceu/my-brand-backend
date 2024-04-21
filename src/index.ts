import express from 'express';
import mongoose from 'mongoose';
import blogRoute from './routes/BlogRoute';
import queryRoute from './routes/QueryRoute';
import userRoute from './routes/userRoute';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const MONGO_URL : any = process.env.MONGO_URL;
const PORT = process.env.port || 3000;

mongoose.connect(MONGO_URL)
.then(() => console.log('connected to mongodb'))
.catch((err) => console.log(err));

// routes
app.use(cors())
app.use(express.json());
app.use('/blogs', blogRoute);
app.use('/queries', queryRoute);
app.use('/users', userRoute);




app.listen(PORT, () => {
    console.log(' Server running on ', PORT)
})
