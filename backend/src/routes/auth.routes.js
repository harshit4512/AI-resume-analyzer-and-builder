import express from "express";
import passport from "../config/passport.js";
import { register, login, logout, getMe,googleAuth,googleAuthCallback } from "../controllers/auth.controller.js";
import protect from "../middlewares/auth.middleware.js";
import { generateAccessToken,
    generateRefreshToken,
    setTokenCookies} from "../utils/generatetoken.js";

const router = express.Router();

// Normal auth
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getMe);

// Google OAuth — Step 1: redirect to Google
router.get("/google",googleAuth);

// Google OAuth — Step 2: callback

// router.get("/google/callback",
//   (req, res, next) => {
//     passport.authenticate("google", { session: false }, (err, user, info) => {
//       console.log("=== GOOGLE CALLBACK ===");
//       console.log("err:", err?.message);
//       console.log("user:", user?.email);
//       console.log("info:", info);

//       if (err || !user) {
//         console.log("Redirecting to login — err or no user");
//         return res.redirect(`${process.env.CLIENT_URL}/login`);
//       }

//       const token = generatetoken(user._id);
//       res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
//     })(req, res, next);
//   }
// );

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLINET_URI}/login?error=google_auth_failed`,
  }),
  googleAuthCallback
)
export default router;