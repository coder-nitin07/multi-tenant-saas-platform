import AppError from "../../utils/AppError.js";
import { verifyAccessToken } from "../../utils/jwt.js";

const authMiddleware = (req, res, next) =>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({ message: 'Access Denied. Token required' });
        }

        const decoded = verifyAccessToken(token);
        if(!decoded){
            return res.status(401).json({ message: 'Token Expired' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        next(new AppError('Invalid or malformed token', 401));
    }
};

export default authMiddleware;