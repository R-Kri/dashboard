import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    // Get token from header
    const authHeader = req.header("Authorization");

    // Check if no token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized, no token" });
    }

    // Verify token
    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        res.status(401).json({ message: "Unauthorized, invalid token" });
    }
};

export default protect;
