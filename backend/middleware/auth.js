import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  //dapat naa ni sa env file ang access token.
  const ACCESS_TOKEN_KEY = 'b4e8d1f7a3c6b9e2d5f8a1c4e7b3d6f9a2c5e8b1d4f7a3c6b9e2d5f8a1c4e7b3';

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    console.log(' No auth header');
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];


  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_KEY);
    console.log(' Decoded:', decoded);
    req["user"] = decoded;
    next();
  } catch (error) {
    console.log('Error:', error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
