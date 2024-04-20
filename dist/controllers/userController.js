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
exports.loginUser = exports.createUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password } = req.body;
        if (fullName == '' && email == '' && password == '') {
            return res.status(401).json({ message: 'Please fill out all fields' });
        }
        const newUser = new UserModel_1.default(req.body);
        newUser.hash_password = bcrypt_1.default.hashSync(req.body.password, 10);
        const existingUser = yield UserModel_1.default.findOne({ email: newUser.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        else {
            const savedUser = yield newUser.save();
            res.status(200).json(savedUser);
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield UserModel_1.default.find({ email });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.loginUser = loginUser;
