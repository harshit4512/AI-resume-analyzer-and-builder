import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {

    try {
        // read token from cookie
        const token = req.cookies?.accessToken

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not logged in. please login first",
            });
        }
         
        
        
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        
        // find user

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        
        

        // attach user to request
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token. Please login again",
        });
    }
}
export default protect;