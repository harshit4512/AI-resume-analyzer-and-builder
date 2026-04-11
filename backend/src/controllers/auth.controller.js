// import User from "../models/user.model.js";
// import { registerUser, loginUser } from "../services/auth.service.js";

// import generatetoken from "../utils/generatetoken.js";

// const cookieOptions = {
//   httpOnly: true,
//   secure: true,
//   sameSite: "None", // ✅ consistent casing everywhere
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// };

// const register = async (req, res) => {

//     try {
//         const user = await registerUser(req.body);
//         const token = generatetoken(user._id);
//         res.cookie("token", token, cookieOptions);

//         res.status(201).json({
//             message: "registered successfully",
//             user: user
//         })


//     }
//     catch (err) {
//         res.status(400).json({
//             message: err.message
//         })
//     }
// }

// const login = async (req, res) => {

//     try {
//         const user = await loginUser(req.body);
//         const token = generatetoken(user._id);

//         res.cookie("token", token, cookieOptions);

//         res.json({ message: "Login successful" });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

// const logout = async (req, res) => {
//     res.cookie("token", "", {
//         httpOnly: true,
//         secure: true,
//         sameSite: "None",
//         expires: new Date(0),
//     })

//     res.status(200).json({
//         message: "Logged out successfully",
//     });
// }

// const getMe = async(req,res)=>{
//         try{
//             const user = await User.findById(req.user._id).select("-password");
//             res.json({user});
//         }
//         catch(error){
//             res.status(500).json({message:"server error"})
//         }
//     }



// export {
//     register,
//     login,
//     logout,
//     getMe
// }

import passport from "../config/passport.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { setTokenCookies } from "../utils/generatetoken.js";

import {
    registerService,
    loginService,
    logoutService,
    refreshTokenService,
    googleCallbackService
} from "../services/auth.service.js";

// REGISTER
const register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body, {
            abortEarly: false,
        });
         
        console.log(req.body);
        
        if (error) {
            
            
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((d) => d.message),
            });
        }

        const { user, accessToken, refreshToken } = await registerService(req.body);
       
                
        

        setTokenCookies(res, accessToken, refreshToken);

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: user.toSafeObject(),
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body, {
            abortEarly: false,
        });
        
        console.log(req.body);
        
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((d) => d.message),
            });
        }

        const { user, accessToken, refreshToken } = await loginService(req.body);

        setTokenCookies(res, accessToken, refreshToken);

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: user.toSafeObject(),
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

// LOGOUT
const logout = async (req, res) => {
    try {
        await logoutService(req.user._id);

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// REFRESH TOKEN
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No refresh token found. Please login again",
            });
        }

        const { newAccessToken, newRefreshToken } =
            await refreshTokenService(token);

        setTokenCookies(res, newAccessToken, newRefreshToken);

        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ME
const getMe = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user.toSafeObject(),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
    // asking google for:
    // profile → name and avatar
    // email   → email address
    session: false,
    // no session because we use cookies
})

// GOOGLE AUTH
const googleAuthCallback = async (req, res) => {
    try {
        const user = req.user;
         console.log(user);
         
        if (!user) {
            return res.redirect(
                `${process.env.CLIENT_URL}/login?error=google_auth_failed`
            );
        }

        const { accessToken, refreshToken } =
            await googleCallbackService(user);

        // ✅ set cookies (IMPORTANT - keep this)
        setTokenCookies(res, accessToken, refreshToken);
        // 🔥 redirect to dashboard (NO token in URL)
        return res.redirect(`${process.env.CLIENT_URL}/dashboard`);

    } catch (error) {
        console.log(error);
        
        return res.redirect(
            `${process.env.CLIENT_URL}/login?error=server_error`
        );
    }
};
export {
    register,
    login,
    logout,
    refreshToken,
    getMe,
    googleAuth,
    googleAuthCallback,
};