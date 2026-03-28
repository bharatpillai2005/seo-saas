import jwt from "jsonwebtoken";

// Protect Middleware (JWT Authentication)
export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Get token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id to request
    req.user = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};