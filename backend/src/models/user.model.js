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
        unique:true,
        sparse:true
    },
    authProvider:{
        type:[String],
        enum:["local","google"],
        default:"local"

       // local = email/password
      // google = google oauth
    },
    
     refreshToken: {
      type: String,
      select: false,
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

userschema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
};

// ================================
// METHOD — remove sensitive fields
// before sending user to frontend
// usage: user.toSafeObject()
// ================================

userschema.methods.toSafeObject = function () {
  const user = this.toObject();
  delete user.password;
  delete user.refreshToken;
  delete user.__v;
  return user;
};

const User = mongoose.model("User",userschema)

export default User