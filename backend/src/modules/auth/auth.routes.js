import express from 'express';
import validate from '../middleware/validate.middleware.js';
import { loginSchema, registerSchema } from './auth.validation.js';
import { login, logout, refreshToken, register } from './auth.controller.js';
const authRouter = express.Router();

authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', validate(loginSchema), login);
authRouter.post('/logout', logout);
authRouter.post('/refreshToken', refreshToken);

export default authRouter;