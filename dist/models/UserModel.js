"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.default.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    hash_password: { type: String, required: true },
    role: { type: String, default: 'user' }
});
UserSchema.methods.comparePassword = function (password) {
    return bcrypt_1.default.compareSync(password, this.hash_password);
};
const userModel = mongoose_1.default.model('User', UserSchema);
exports.default = userModel;
