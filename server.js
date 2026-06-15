require('dotenv').config();

const express = require ("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 

const ConnectDb = require('./config/db')

const userRoute = require('./routes/userRoute')
app.use('/api',userRoute);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
ConnectDb();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});
