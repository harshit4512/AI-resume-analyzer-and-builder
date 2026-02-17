import User from "../models/user.model.js";
import bcrypt from "bcrypt"

const registerUser =async ({username,email,password}) =>{
    const userexists = await User.findOne({email});

    if(userexists) throw new Error("User already exists")


        const user = await User.create({
            username,
            email,
            password
        })

        return user;
};

const loginUser = async({email,password})=>{
    const user = await User.findOne({email});
    if(!user) throw new Error("Invalid credentials")

        const ismatch = await bcrypt.compare(password,user.password)

        if(!ismatch) throw new Error("Invalid Credentials")

    return user;
}

export{
    registerUser,
    loginUser
}

