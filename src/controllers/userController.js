const { createUserService, updateUserService, getUserListService, getUserDetailsService, deleteUserService } = require("../services/userService");
const { validateUser } = require("../utils/validation");
const User = require("../models/userModel")

exports.createUser = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({ status: 400, message: error.details[0].message });

        const email = req.body.email;

        // Check if email already exists
        const existingUser = await User.findOne({ email, is_deleted: false });
        if (existingUser) {
            return res.status(400).json({ status: 400, message: "Email already registered" });
        }

        const response = await createUserService(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;
        if (!id) return res.status(400).json({ status: 400, message: "User ID is required" });

        // Fetch user by ID
        const existingUser = await User.findById(id);
        if (!existingUser || existingUser.is_deleted) {
            return res.status(404).json({ status: 404, message: "User not found or has been deleted." });
        }

        // Check email
        if (updateData.email && updateData.email !== existingUser.email) {
            const emailExists = await User.findOne({ email: updateData.email });
            if (emailExists && emailExists._id.toString() !== id) {
                throw new Error("Email is already in use.");
            }
        }

        const response = await updateUserService(id, updateData);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const response = await getUserListService();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};

// Get User Details
exports.getUserDetails = async (req, res) => {
    try {
        const response = await getUserDetailsService(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const response = await deleteUserService(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};