
require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const ConnectDb = require("./config/db");
const userRoute = require("./routes/userRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", userRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  await ConnectDb();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`server is running on port ${PORT}`);
  });
}

startServer();