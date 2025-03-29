const User = require("../models/userModel");

// Create User
const createUserService = async (data) => {
    const user = new User(data);
    await user.save();
    return { status: 201, message: "User created successfully" };
};

// Update user
const updateUserService = async (id, data) => {
    const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
    return { status: 200, message: "User updated successfully" };
};

// Get User List
const getUserListService = async () => {
    const user = await User.find({ is_active: true, is_deleted: false }).select("-password");
    return { status: 200, message: "user list", user }
};

// Get User Details
const getUserDetailsService = async (id) => {
    const user = await User.findOne({_id:id, is_deleted: false}).select("-password");
    if (!user) {
        throw new Error("User not found.");
    }
    return { status: 200, message: "User details", user }
};

// Delete User
const deleteUserService = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error("User not found.");
    }
    
    // Set is_deleted true
    user.is_deleted = true;
    await user.save();

    return { status: 200, message: "User deleted successfully" };
};

module.exports = { createUserService, updateUserService, getUserListService, getUserDetailsService, deleteUserService };