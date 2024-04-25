"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const BlogRoute_1 = __importDefault(require("./routes/BlogRoute"));
const QueryRoute_1 = __importDefault(require("./routes/QueryRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const swagger_1 = __importDefault(require("./Swagger/swagger"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.port || 3000;
const corsOptions = {
    origin: "*",
    methods: 'GET, POST, DELETE, PUT',
};
mongoose_1.default.connect(MONGO_URL)
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log(err));
// routes
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/blogs', BlogRoute_1.default);
app.use('/queries', QueryRoute_1.default);
app.use('/users', userRoute_1.default);
app.use(swagger_1.default);
const server = app.listen(PORT, () => {
    console.log(' Server running on ', PORT);
});
server.on('error', (err) => {
    console.log(err);
});
