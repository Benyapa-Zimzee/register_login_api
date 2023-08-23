"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!validator_1.default.isEmail(username)) {
        return res.status(400).json({ message: 'Please enter email address' });
    }
    try {
        const existingUser = await User_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({
            username,
            password: hashedPassword,
        });
        await newUser.save();
        return res.status(201).json({ message: 'Registration successful' });
    }
    catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!validator_1.default.isEmail(username)) {
        return res.status(400).json({ message: 'Please enter email address' });
    }
    try {
        const user = await User_1.default.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        return res.status(200).json({ message: 'Login successful' });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
