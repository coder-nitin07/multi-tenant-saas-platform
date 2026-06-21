import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import morgan from "morgan";
import healthRouter from './routes/health.route.js';
const app = express();

// middlware
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Multi-Tenant SaaS Platform');
});

// routes
app.use('/api', healthRouter);

// error Handler
app.use(errorHandler);

export default app;