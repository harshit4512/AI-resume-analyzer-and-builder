import express from "express";
import passport from "../config/passport.js";
import { register, login, logout, getMe } from "../controllers/auth.controller.js";
import protect from "../middlewares/auth.middleware.js";
import generatetoken from "../utils/generatetoken.js";

const router = express.Router();

// Normal auth
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getMe);

// Google OAuth — Step 1: redirect to Google
router.get("/google",
  passport.authenticate("google", { 
    scope: ["profile", "email"], 
    session: false 
  })
);

// Google OAuth — Step 2: callback
router.get("/google/callback",
  (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, user, info) => {

      console.log("err:", err);
      console.log("user:", user);
      console.log("info:", info);

      if (err) {
        console.error("Passport error:", err);
        return res.redirect(`${process.env.CLIENT_URL}/login`);
      }
      if (!user) {
        console.error("No user returned:", info);
        return res.redirect(`${process.env.CLIENT_URL}/login`);
      }

      const token = generatetoken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
         secure: process.env.NODE_ENV === "production", // ✅ false on localhost
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // ✅ Lax on localhost
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    })(req, res, next);
  }
);

export default router;

// import express from "express";
// import { OAuth2Client } from "google-auth-library";
// import { register, login, logout, getMe } from "../controllers/auth.controller.js";
// import protect from "../middlewares/auth.middleware.js";
// import generatetoken from "../utils/generatetoken.js";
// import User from "../models/user.model.js";

// const router = express.Router();
// const client = new OAuth2Client(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_CALLBACK_URL
// );

// // Normal auth
// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);
// router.get("/me", protect, getMe);

// // Google OAuth — Step 1: redirect to Google
// router.get("/google", (req, res) => {
//   const url = client.generateAuthUrl({
//     access_type: "offline",
//     scope: ["profile", "email"],
//   });
//   res.redirect(url);
// });

// // Google OAuth — Step 2: handle callback
// router.get("/google/callback", async (req, res) => {
//   try {
//     const { code } = req.query;
//     const { tokens } = await client.getToken(code);
//     client.setCredentials(tokens);

//     const ticket = await client.verifyIdToken({
//       idToken: tokens.id_token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const { sub, email, name } = ticket.getPayload();

//     let user = await User.findOne({ googleId: sub });

//     if (!user) {
//       user = await User.findOne({ email });
//       if (user) {
//         // link Google to existing account
//         user.googleId = sub;
//         await user.save();
//       } else {
//         // create brand new user
//         user = await User.create({
//           googleId: sub,
//           username: name,
//           email,
//           password: null,
//         });
//       }
//     }

//     const token = generatetoken(user._id);
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });
//     res.redirect(`${process.env.CLIENT_URL}/dashboard`);

//   } catch (error) {
//     console.error("Google OAuth error:", error.message);
//     res.redirect(`${process.env.CLIENT_URL}/login`);
//   }
// });

// export default router;