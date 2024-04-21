import express from 'express';
import { createQuery, getQuery } from '../controllers/queryController';

const route = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     queries:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: unique identifier of the blog
 *         name:
 *           type: string
 *           description: title of the blog
 *         email:
 *           type: string
 *           description: content of the blog
 *         query:
 *           type: string
 *           description: author of the blog
 */

/**
 * @swagger
 * /queries/getQuery:
 *   get:
 *     summary: get all queries from mongodb
 *     description: This api is used to get all queries from mongodb
 *     responses:
 *       200:
 *         description: successfully retrieved data from mongodb
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/queries'
 *       500:
 *         description: failed to get queries
 */

/**
 * @swagger
 * /blogs/sendquery:
 *   post:
 *     summary: post a query to mongodb
 *     description: This api is used to post a query to mongodb
 *     responses:
 *       200:
 *         description: message sent
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/queries'
 *       500:
 *         description: failed to send message
 */

route.post('/sendquery', createQuery);
route.get('/getquery', getQuery);

const queryRoute = module.exports = route;
export default queryRoute