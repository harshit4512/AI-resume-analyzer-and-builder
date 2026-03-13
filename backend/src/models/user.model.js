import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        default:null
    },
    googleId:{
        type:String,
        default:null
    },
},{
    timestamps:true
});

userschema.pre("save",async function(){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    
});



const User = mongoose.model("User",userschema)

export default User