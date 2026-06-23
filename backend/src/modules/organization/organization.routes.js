import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createOrganization } from './organization.controller.js';
import validate from '../middleware/validate.middleware.js';
import { organizationSchema } from './organization.validation.js';
const organizationRouter = express.Router();

organizationRouter.post('/createOrganization', validate(organizationSchema), authMiddleware, createOrganization);

export default organizationRouter;