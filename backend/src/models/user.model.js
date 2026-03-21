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

// save is a or event name in model which tells him to run this before svaing anything 
userschema.pre("save", async function() {
    // skip if password not modified or is null (Google users)
    if (!this.isModified("password") || !this.password) return;
    this.password = await bcrypt.hash(this.password, 10);
});


const User = mongoose.model("User",userschema)

export default User