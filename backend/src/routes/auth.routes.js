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


router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google_auth_failed`,
  }),
  googleAuthCallback
)
export default router;