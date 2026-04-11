import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 🔥 Extract data from Google profile
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;
        const username = profile.displayName;

        if (!email) {
          return done(new Error("Google account has no email"), null);
        }

        // ============================
        // 1. Find user by googleId
        // ============================
        let user = await User.findOne({ googleId });

        if (user) {
          return done(null, user);
        }

        // ============================
        // 2. Find user by email (LINK ACCOUNT)
        // ============================
        user = await User.findOne({ email });

        if (user) {
          // 🔥 link google account
          user.googleId = googleId;

          if (!user.authProvider.includes("google")) {
            user.authProvider.push("google");
          }

          await user.save({ validateBeforeSave: false });

          return done(null, user);
        }

        // ============================
        // 3. Create new user
        // ============================
        user = await User.create({
          username,
          email,
          googleId,
          authProvider: ["google"],
        });

        return done(null, user);

      } catch (error) {
        return done(error, null);
      }
    }
  )
);



export default passport