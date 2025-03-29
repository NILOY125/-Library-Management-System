require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.DB_HOST,
    JWT_SECRET: process.env.JWT_SECRET,
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN || "1d",
};