import { registerUser, loginUser } from "../services/auth.service.js";

import generatetoken from "../utils/generatetoken.js";

const register = async (req, res) => {

    try {
        const user = await registerUser(req.body);
        const token = generatetoken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure:true,
            samesite:"None",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

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

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ message: "Login successful" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({
        message: "Logged out successfully",
    });
}



export {
    register,
    login,
    logout
}