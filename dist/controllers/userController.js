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
exports.createAdmin = exports.loginUser = exports.createUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
            res.status(200).json({ message: "Signed up successfully" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "failed to sign up" });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield UserModel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        if (!bcrypt_1.default.compareSync(password, user.hash_password)) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const accessToken = jsonwebtoken_1.default.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({ message: "Logged in successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "failed to log in" });
    }
});
exports.loginUser = loginUser;
const createAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminUser = new UserModel_1.default({
            fullName: 'Bernice Uwituze',
            email: 'berniceuwituze@gmail.com',
            hash_password: bcrypt_1.default.hashSync(process.env.adminpassword, 10),
            role: 'admin'
        });
        yield adminUser.save();
        process.exit(0);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
});
exports.createAdmin = createAdmin;
(0, exports.createAdmin)();
