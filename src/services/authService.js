const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { JWT_SECRET, TOKEN_EXPIRES_IN } = require("../config/env");

const registerUser = async (name, email, password, role) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        return { message: "User registered successfully" };
    } catch (err) {
        console.log(err)
        return { message: err.message, status: err.status}
    }
};

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Invalid credentials");
        }
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
        return { token };

    } catch (err) {
        console.log(err)
    }
};

module.exports = { registerUser, loginUser };