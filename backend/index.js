const express = require ("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDb= require("./config/connectionDb");
const cors = require ("cors")

connectDb(); // for database connection
app.use(express.json());
app.use(cors());

app.use("/api", require ("./routes/books")) // for all routes

const PORT = process.env.PORT || 3000; // for port number

app.listen(PORT,(err)=>{
    console.log(`app is running on ${PORT}`);
})