import express from 'express';
import { createUser, loginUser } from '../controllers/userController';

const route = express.Router();

route.post('/signup', createUser);
route.post('/login', loginUser);

const userRoute = module.exports = route;
export default userRoute;