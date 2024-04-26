import express from "express";
import { Subscribe } from "../controllers/subcribeController";


const route = express.Router();

route.post('/', Subscribe);
const subscribeRoute = module.exports = route;
export default subscribeRoute;

