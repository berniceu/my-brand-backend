import express from 'express';
import mongoose from 'mongoose';
import blogRoute from './routes/BlogRoute';
import queryRoute from './routes/QueryRoute';
import userRoute from './routes/userRoute';
import subscribeRoute from './routes/subcribeRoute';
import { createAdmin } from './controllers/userController';
import swaggerRouter from './Swagger/swagger';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();
const app = express();
const MONGO_URL : any = process.env.MONGO_URL;
const PORT = process.env.port || 3000;
const corsOptions = {
    origin: "*",
    methods: 'GET, POST, DELETE, PUT',

}

mongoose.connect(MONGO_URL)
.then(() => console.log('connected to mongodb'))
.catch((err) => console.log(err));

// routes
app.use(cors(corsOptions))
app.use(express.json());

createAdmin();

app.use('/blogs', blogRoute);
app.use('/queries', queryRoute);
app.use('/users', userRoute);
app.use('/subscribe', subscribeRoute);
app.use(swaggerRouter)




const server = app.listen(PORT, () => {
    console.log(' Server running on ', PORT)
})

server.on('error', (err) => {
    console.log(err)
})
