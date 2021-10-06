import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(400).json({ msg: "No token, Authorization Denied!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not Valid" });
  }
};