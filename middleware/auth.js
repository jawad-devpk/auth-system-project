const jwt = require("jsonwebtoken");

function getTokenFromCookie(cookieHeader) {
    if (!cookieHeader) {
        return "";
    }

    const cookies = cookieHeader.split(";");

    for (const cookie of cookies) {
        const trimmedCookie = cookie.trim();

        if (trimmedCookie.startsWith("authToken=")) {
            return decodeURIComponent(trimmedCookie.slice("authToken=".length));
        }
    }

    return "";
}

function auth(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const headerToken = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : "";
    const cookieToken = getTokenFromCookie(req.headers.cookie);
    const token = headerToken || cookieToken;

    if (!token) {
        return res.status(401).json({
            message: "Access denied"
        });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({
            message: "JWT secret code is missing"
        });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid token"
        });
    }
}

module.exports = auth;
