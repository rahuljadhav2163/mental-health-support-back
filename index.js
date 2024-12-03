import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import User from "./model/user.js";

const app = express();

app.use(cors());
app.use(express.json());

const MongoDBConn = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected');
    } catch (e) {
        console.log(`Error: ${e.message}`);
        process.exit(1); 
    }
};
MongoDBConn();

app.get('/', (req, res) => {
    res.send('server is running')
})


// user register

app.post('/api/register', async (req, res) => {
    const { fullName, mobile, password } = req.body;
    try {
        const newUser = new User({
            fullName, mobile, password
        })
        const saveUser = await newUser.save();
        res.json({
            success: true,
            data: saveUser,
            message: "Signup successfully..!"
        }
        )
    } catch (e) {
        res.json({
            success: "false",
            message: e.message
        })
    }
})



app.post('/api/login', async (req, res) => {
    const { mobile, password } = req.body;
    const findUser = await User.findOne({ password, mobile }).select('fullName mobile')

    if (findUser == null) {
        return res.json({
            success: "false",
            message: "Something went wrong..!"
        }
        )
    }
    res.json({
        success: "true",
        data: findUser,
        message: "Login successfully..!"
    }
    )
})


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
});
