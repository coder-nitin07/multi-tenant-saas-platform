import express from 'express';
import errorHandler from './modules/middleware/errorHandler.js';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import healthRouter from './modules/routes/health.route.js';
import authRouter from './modules/auth/auth.routes.js';
const app = express();

// middlware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Multi-Tenant SaaS Platform');
});

// routes
app.use('/api', healthRouter);
app.use('/api', authRouter);

// error Handler
app.use(errorHandler);

export default app;