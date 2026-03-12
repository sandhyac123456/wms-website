import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const authToken = req.header("Authorization");
    console.log("🔒 Authenticating admin with token:", authToken);

    if (!authToken || !authToken.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing or malformed.",
      });
    }

    const token = authToken.split(" ")[1];

    console.log("token", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("decode data", decoded);

      req.user = decoded;

      console.log("req user", req.user);
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "Invalid token",
      });
    }
    next();
  } catch (error) {
    console.error("Middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

