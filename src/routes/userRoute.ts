import express from 'express';
import { createUser, loginUser } from '../controllers/userController';

const route = express.Router();

/**
 * @swagger
 * components: 
 *   schemas:
 *     users:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: name of user
 *         email:
 *           type: string
 *           description: email of user
 *         password: 
 *           type: string
 *           description: password
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: save user to mongodb
 *     description: this api is used to save users to mongodb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       '200':
 *         description: user added successfully
 *       '400': 
 *         description: user already exists
 *       '500':
 *         description: failed to sign up
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: user login
 *     description: this api is used to log users if they exist in mongodb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: user logged in successfully 
 *       '400':
 *         description: user does not exist
 *       '401':
 *         description: incorrect password
 *       '500':
 *         description: failed to log in
 * 
 */

route.post('/signup', createUser);
route.post('/login', loginUser);

const userRoute = module.exports = route;
export default userRoute;