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
exports.Subscribe = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const subscribeModel_1 = __importDefault(require("../models/subscribeModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.user,
        pass: process.env.password,
    },
    tls: {
        rejectUnauthorized: false,
    }
});
const Subscribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const newSubscriber = yield subscribeModel_1.default.create({ email });
        yield transporter.sendMail({
            from: process.env.user,
            to: email,
            subject: "Welcome to my Blog newsletter",
            html: `<p>Thank you for subscribing to my newsletter, you will be alerted when new blogs are posted!!
            <p>Kind Regards,</p>
            <p>Bernice Uwituze</p>`
        });
        res.status(200).json({ message: "Mail sent successfully" });
        subscribeModel_1.default.create({ email });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to send email" });
    }
});
exports.Subscribe = Subscribe;
