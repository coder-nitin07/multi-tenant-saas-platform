import jwt from 'jsonwebtoken';
import 'dotenv/config';

const generateAccessToken = (user) =>{
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  ); 
};

const generateRefreshToken = (user)=>{
    return jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};

const checkJwtExpiry = (token)=>{
   try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};


const checkAccessTokenExpiry = (token)=>{
   try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};

export { generateAccessToken, generateRefreshToken, checkJwtExpiry, checkAccessTokenExpiry };