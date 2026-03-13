import { Error} from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"

const registerUser =async ({username,email,password}) =>{

    if(!password){
        throw new Error("password is required");
    }
    const userexists = await User.findOne({email});

    if(userexists) throw new Error("User already exists")

       const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            username,
            email,
            password:hashedPassword
        })

        return user;
};

const loginUser = async({email,password})=>{
    const user = await User.findOne({email});
    if(!user) throw new Error("Invalid credentials")

        if(!user.password){
            throw new Error("This account uses Google login. Please sign in with Google.")
        }
        const ismatch = await bcrypt.compare(password,user.password)

        if(!ismatch) throw new Error("Invalid Credentials")

    return user;
}

export{
    registerUser,
    loginUser
}

