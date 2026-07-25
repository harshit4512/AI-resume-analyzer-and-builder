import jwt from "jsonwebtoken"

const generateAccessToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m" }
    );
};


const generateRefreshToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" }
    );
};

const setTokenCookies = (res, accessToken, refreshToken) => {
    // access token cookie
    // expires in 15 minutes

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        // javascript cannot read this cookie
        // completely invisible to frontend JS

        secure: process.env.NODE_ENV === "production",
        // only send over HTTPS in production
        // HTTP is fine in development

        sameSite:  process.env.NODE_ENV === "production" ? "none" : "lax",
        // cookie only sent to same site
        // prevents CSRF attacks

        maxAge: Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRES) * 60 * 1000,
        // 15 minutes in milliseconds
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:  process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000,
    })



}

export {
    generateAccessToken,
    generateRefreshToken,
    setTokenCookies
}