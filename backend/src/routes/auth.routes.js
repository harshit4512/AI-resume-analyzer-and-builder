import express from "express";
import passport from "passport";
import { register, login,logout,getMe } from "../controllers/auth.controller.js";
import  protect  from "../middlewares/auth.middleware.js"
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("me",protect,getMe);


// Google OAuth
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/login`, session: false }),
  (req, res) => {
    const token = generatetoken(req.user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);
export default router;