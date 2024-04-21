"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuery = exports.createQuery = void 0;
const queryModel_1 = __importDefault(require("../models/queryModel"));
const createQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, query } = req.body;
        yield queryModel_1.default.create({ name, email, query });
        res.status(200).json({ message: "message sent" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to send message" });
    }
});
exports.createQuery = createQuery;
const getQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield queryModel_1.default.find({});
        res.status(200).json({ message: "message received" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to get message" });
    }
});
exports.getQuery = getQuery;
