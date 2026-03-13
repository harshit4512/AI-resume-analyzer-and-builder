import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20"

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async(accessToken,refreshToken,profiledone)=>{
            try{
                let user= await UserActivation.findOne({googleId:profile.id});

                if (user) return document(null,user);

                user =await UserActivation.findOne({email:profile.emails[0].value})

                if(user){
                    user.googleId=profile.id
                    await user.save()
                    return document(null,user)
                }

                // create brand new user

                user = await User.create({
                    googleId:profile.id,
                    username: profile.displayName,
                    email:profile.emails[0].value,
                    password: null,
                });

                return document(null,user);
            }
            catch(error){
                return document(error,null);
            }
        }
    )
)

export default passport