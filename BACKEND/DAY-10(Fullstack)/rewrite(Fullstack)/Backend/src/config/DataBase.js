const mongoose = require("mongoose");

async function ConnectToDB() {
  try {
    await mongoose.connect(
      process.env.DB_URI
    );

    console.log("Connected to MongoDB...");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
}

module.exports = ConnectToDB;