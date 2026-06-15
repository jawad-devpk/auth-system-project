const mongoose = require("mongoose")

const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function ConnectDb() {
    try {

        await mongoose.connect(process.env.MONGODB_URI)
        console.log("database connected")

    } catch (error) {
        console.log("Database Not Connected")
        console.log("Error message:", error.message);

    }
}

module.exports = ConnectDb
