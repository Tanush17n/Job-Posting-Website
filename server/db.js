const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const url = process.env.MONGO_URL;

if (!url) {
    console.error("Error: MONGO_URL is not defined. Make sure you have a .env file and dotenv is installed.");
    process.exit(1); // Stop the server if the database URL is missing
}

module.exports.connect = () => {
    mongoose.connect(url)
        .then(() => console.log("Database is connected"))
        .catch((err) => console.error("Database connection error:", err));
};


