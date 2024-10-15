const jwt = require("jsonwebtoken");
const { User } = require("../db/index");
const config = require("../config");

async function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];  
    
    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    try {
        
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded;

        next();   
    } catch (error) {
        console.error("JWT verification error:", error);  
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = userMiddleware;
