"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subcribeController_1 = require("../controllers/subcribeController");
const route = express_1.default.Router();
route.post('/', subcribeController_1.Subscribe);
const subscribeRoute = (module.exports) = route;
exports.default = subscribeRoute;
