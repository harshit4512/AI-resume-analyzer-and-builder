import User from "../models/user.model.js";
import { registerUser, loginUser } from "../services/auth.service.js";

import generatetoken from "../utils/generatetoken.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None", // ✅ consistent casing everywhere
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = async (req, res) => {

    try {
        const user = await registerUser(req.body);
        const token = generatetoken(user._id);
        res.cookie("token", token, cookieOptions);

        res.status(201).json({
            message: "registered successfully",
            user: user
        })


    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

const login = async (req, res) => {

    try {
        const user = await loginUser(req.body);
        const token = generatetoken(user._id);

        res.cookie("token", token, cookieOptions);

        res.json({ message: "Login successful" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(0),
    })

    res.status(200).json({
        message: "Logged out successfully",
    });
}

const getMe = async(req,res)=>{
        try{
            const user = await User.findById(req.user._id).select("-password");
            res.json({user});
        }
        catch(error){
            res.status(500).json({message:"server error"})
        }
    }



export {
    register,
    login,
    logout,
    getMe
}