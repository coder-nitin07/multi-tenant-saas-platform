import bcrypt from "bcryptjs";
import prisma from '../../config/prisma.js';
import AppError from "../../utils/AppError.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

// registet api
const register = async (req, res, next)=>{
    try {
        const { email, password } = req.body;

        // check user exist already
        const User  = await prisma.user.findUnique({ where: { email } });
        if(User){
            throw new AppError('Email already exist', 400);
        }

        // hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user  = await prisma.user.create({
          data: {
            email,
            password: hashedPassword
          },
          select: {
            id: true,
            email: true,
            createdAt: true
          }
        });

        // generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // store the refresh token in the DB
        await prisma.user.update({
          where: { id: user.id },
          data: { refreshToken }
        });

        // save refreshToken in cookies
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000
        });
  

        return res.status(201).json({
          message: 'User created Successfully',
          accessToken,
          user: user.email
        });
    } catch (err) {
        next(err);
    }
};

// login api
const login = async (req, res, next)=>{
  try {
    const { email, password }  = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if(!existingUser){
      throw new AppError('Invalid credentials', 401);
    }

    const checkPassword = await bcrypt.compare(password, existingUser.password);
    if(!checkPassword){
      throw new AppError('Invalid Credentails', 401);
    }

    // generate tokens
    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);   
    
    // save refrshToken in DB
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { refreshToken }
    });

    // save refreshToken in cookies
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });


    return res.status(200).json({
      message: 'User Login Successfully',
      accessToken,
      user: {
        id: existingUser.id,
        email: existingUser.email
      }
    });
  } catch (err) {
    next(err);
  }
};

// logout api
const logout = async (req, res, next)=>{
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
      return res.status(200).json({ message: 'User Logged Out Successfully' });
    }

    // find the User by the refresh token
    const existingUser = await prisma.user.findFirst({
      where: { refreshToken }
    });

    if(!existingUser){
      return res.status(200).json({ message: 'User Logged Out Successfully' });
    }

    // remove refresh token from DB
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { refreshToken: null }
    });

    // clear refrshToken from cookies
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });

    res.status(200).json({
      message: 'User Logged Out Successfully',
      user: {
        id: existingUser.id,
        email: existingUser.email
      }
    });
  } catch (err) {
    next(err);
  }
};

export { register, login, logout };