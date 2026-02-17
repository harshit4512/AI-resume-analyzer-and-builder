import { registerUser,loginUser } from "../services/auth.service.js";

import generatetoken from "../utils/generatetoken.js";

const register = async (req,res)=>{

    try{
        const user =await registerUser(req.body);
        const token =generatetoken(user._id);
        res.cookie("token", token, { httpOnly: true });

        res.status(201).json({
            message:"registered successfully",
            user:user
        })


    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

const login = async (req,res)=>{
      
    try {
    const user = await loginUser(req.body);
    const token = generatetoken(user._id);

    res.cookie("token", token, { httpOnly: true });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export{
    register,
    login
}