import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import User from "../models/user.model.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            proxy: true,
        },
        async(accessToken,refreshToken,profile,done)=>{
            try{
                let user= await User.findOne({googleId:profile.id});

                if (user) return done(null,user);

                user =await User.findOne({email:profile.emails[0].value})

                if(user){
                    user.googleId=profile.id
                    await user.save()
                    return done(null,user)
                }

                // create brand new user

                user = await User.create({
                    googleId:profile.id,
                    username: profile.displayName,
                    email:profile.emails[0].value,
                    password: null,
                });

                return done(null,user);
            }
            catch(error){
                return done(error,null);
            }
        }
    )
)

export default passport