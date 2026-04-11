// import { Error} from "mongoose";
// import User from "../models/user.model.js";
// import bcrypt from "bcrypt"

// const registerUser =async ({username,email,password}) =>{

//     if(!password){
//         throw new Error("password is required");
//     }
//     const userexists = await User.findOne({email});

//     if(userexists) throw new Error("User already exists")

   

//         const user = await User.create({
//             username,
//             email,
//             password
//         })

//         return user;
// };

// const loginUser = async({email,password})=>{
//     const user = await User.findOne({email});
//     if(!user) throw new Error("Invalid credentials")

//         if(!user.password){
//             throw new Error("This account uses Google login. Please sign in with Google.")
//         }
//         const ismatch = await bcrypt.compare(password,user.password)

//         if(!ismatch) throw new Error("Invalid Credentials")

//     return user;
// }

// export{
//     registerUser,
//     loginUser
// }

import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/generatetoken.js";

// REGISTER SERVICE
export const registerService = async ({ username, email, password }) => {
    const existingUser = await User.findOne({ email });
    
    
    if (existingUser) {
        throw new Error("Email already registered");
    }

    const user = await User.create({
        username,
        email,
        password,
        authProvider: ["local"],
    });
    
  
    
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { user, accessToken, refreshToken };
};

// LOGIN SERVICE
export const loginService = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new Error("Invalid email or password");
    }

    if (!user.authProvider.includes("local")) {
        throw new Error("Please login with Google");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { user, accessToken, refreshToken };
};

// LOGOUT SERVICE
export const logoutService = async (userId) => {
    await User.findByIdAndUpdate(
        userId,
        { refreshToken: null },
        { new: true }
    );
};

// REFRESH TOKEN SERVICE
export const refreshTokenService = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id).select("+refreshToken");

    if (!user || user.refreshToken !== token) {
        throw new Error("Invalid refresh token. Please login again");
    }

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    return { newAccessToken, newRefreshToken };
};

// GOOGLE CALLBACK SERVICE
export const googleCallbackService = async (user) => {
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};