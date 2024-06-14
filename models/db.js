const mongoose = require("mongoose");
async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/studentDb");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

connectDB();
require("./student.model");