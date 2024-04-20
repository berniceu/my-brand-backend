import express from 'express';
import { createQuery, getQuery } from '../controllers/queryController';

const route = express.Router();

route.post('/sendquery', createQuery);
route.get('/getquery', getQuery);

const queryRoute = module.exports = route;
export default queryRoute