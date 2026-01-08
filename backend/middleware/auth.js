import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    // 1. Get token from cookies or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    // 2. Check if token exists
    if (!token) {
        return res.status(401).json({ 
            status: "error", 
            message: "No token, authorization denied" 
        });
    }

    try {
        // 3. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Attach user data with BOTH id and _id for compatibility
        req.user = { 
            id: decoded.id,
            _id: decoded.id,  // Add _id for MongoDB compatibility
            email: decoded.email 
        };
        
        // Ensure req.body exists before assigning userId
        if (req.body) {
            req.body.userId = decoded.id; 
        }

        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        const message = error.name === "TokenExpiredError" ? "Token expired" : "Token is not valid";
        return res.status(403).json({ 
            status: "error", 
            message 
        });
    }
};

export default authMiddleware;