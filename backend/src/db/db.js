import mongoose from "mongoose";

async function connectdb(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected");
    }
    catch(err){
          console.error("databse error",err);
    }

}

export default connectdb