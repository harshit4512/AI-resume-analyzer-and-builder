// import express from "express";
// import passport from "../config/passport.js";
// import { register, login, logout, getMe } from "../controllers/auth.controller.js";
// import protect from "../middlewares/auth.middleware.js";
// import generatetoken from "../utils/generatetoken.js";

// const router = express.Router();

// // Normal auth
// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);
// router.get("/me", protect, getMe);

// // Google OAuth — Step 1: redirect to Google
// router.get("/google",
//   passport.authenticate("google", { 
//     scope: ["profile", "email"], 
//     session: false 
//   })
// );

// // Google OAuth — Step 2: callback
// router.get("/google/callback",
//   (req, res, next) => {
//     passport.authenticate("google", { session: false }, (err, user, info) => {

//       console.log("err:", err);
//       console.log("user:", user);
//       console.log("info:", info);

//       if (err) {
//         console.error("Passport error:", err);
//         return res.redirect(`${process.env.CLIENT_URL}/login`);
//       }
//       if (!user) {
//         console.error("No user returned:", info);
//         return res.redirect(`${process.env.CLIENT_URL}/login`);
//       }

//       const token = generatetoken(user._id);
//       res.cookie("token", token, {
//         httpOnly: true,
//          secure: process.env.NODE_ENV === "production", // ✅ false on localhost
//         sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // ✅ Lax on localhost
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//       });
//       res.redirect(`${process.env.CLIENT_URL}/dashboard`);
//     })(req, res, next);
//   }
// );

// export default router;



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
      if (err || !user) {
        return res.redirect(`${process.env.CLIENT_URL}/login`);
      }

      const token = generatetoken(user._id);

      // ✅ pass token in URL instead of cookie — works on all mobile browsers
      res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
    })(req, res, next);
  }
);

export default router;