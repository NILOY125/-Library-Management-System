const { registerUser, loginUser } = require("../services/authService");
const { validateRegister, validateLogin } = require("../utils/validation");
const User = require("../models/userModel");

exports.register = async (req, res) => {
    try {
        const { error } = validateRegister(req.body);
        if (error) return res.status(400).json({ status: 400, message: error.details[0].message });

        const { name, email, password, role } = req.body;
        
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 400, message: "Email already registered" });
        }
        
        const response = await registerUser(name, email, password, role);
        res.status(201).json({ status: 201, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).json({ status: 400, message: error.details[0].message });

        const { email, password } = req.body;
        const response = await loginUser(email, password);
        res.status(200).json({ status: 200, token: response.token, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};