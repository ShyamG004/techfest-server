const express = require('express');
const dotenv = require('dotenv');
const cors=require('cors');
const regRoutes=require("./routes/regRoutes");
const userRoutes=require("./routes/userRoutes");
const connectDB = require('./config/db');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: '200mb' })); 
app.use(express.urlencoded({ limit: '200mb', extended: true }));
app.use(helmet());


// const limiter = rateLimit({
//     windowMs: 2 * 60 * 1000, 
//     max: 10, 
//     message: "Too many requests from the same IP, please try again after 3 minutes.",
// });

app.use(limiter); 


app.get("/",async(req,res)=>{
     res.json("WELCOME TO NEC TECHFEST");
})

app.use("/api/registration",regRoutes);
app.use("/api/user",userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));