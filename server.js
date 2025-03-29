require('dotenv').config();
const express = require('express');
const cors = require("cors");
const connectDB = require('./src/config/db');
const { PORT } = require('./src/config/env');
const routes = require("./src/routes");
const errorHandler = require("./src/middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", routes);
app.use(errorHandler);

// Connect to Database
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));