const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ status: 401, message: "Access Denied. Token missing or malformed." });
        }

        const token = authHeader.split(" ")[1]; // Extract token after 'Bearer '
        if (!token) {
            return res.status(401).json({ status: 401, message: "Invalid token format." });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ status: 401, message: "Token verification failed." });
        }

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ status: 401, message: "User not found. Invalid token." });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Invalid or expired token.", error: error.message });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ status: 403, message: "Forbidden: You don't have permission to perform this action." });
        }
        next();
    };
};

module.exports = {authenticate, authorize};