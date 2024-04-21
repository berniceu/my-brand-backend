"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const route = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: name of the user
 *         email:
 *           type: string
 *           description: email of the user
 *         password:
 *           type: string
 *           description: password
 */
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: save a user to MongoDB
 *     description: This API is used to save users to MongoDB
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: user added successfully
 *       400:
 *         description: ser already exists
 *       500:
 *         description: failed to sign up
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: user login
 *     description: This API is used to log in users if they exist in
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
 *       200:
 *         description: user logged in successfully
 *       400:
 *         description: user does not exist
 *       401:
 *         description: incorrect password
 *       500:
 *         description: failed to log in
 */
route.post("/signup", userController_1.createUser);
route.post("/login", userController_1.loginUser);
const userRoute = (module.exports = route);
exports.default = userRoute;
