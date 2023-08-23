"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb+srv://Admin:1234@cluster0.nqpjo81.mongodb.net/Login')
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
app.use('/', auth_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
