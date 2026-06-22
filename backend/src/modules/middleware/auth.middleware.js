import { checkAccessTokenExpiry } from "../../utils/jwt.js";

const authMiddleware = (req, res, next) =>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(403).json({ message: 'Access Denied. Token required' });
        }

        const decoded = checkAccessTokenExpiry(token);
        if(!decoded){
            return res.status(403).json({ message: 'Token Expired' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;