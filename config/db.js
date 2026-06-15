const mongoose = require("mongoose")

async function ConnectDb() {
    try {

        await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/auth-project")
        console.log("database connected")

    } catch (error) {
        console.log("database is not connected")
    }
}

module.exports = ConnectDb
