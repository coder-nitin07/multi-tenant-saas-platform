import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createOrganization, getOrganization, getOrganizationById } from './organization.controller.js';
import validate from '../middleware/validate.middleware.js';
import { organizationSchema } from './organization.validation.js';
const organizationRouter = express.Router();

organizationRouter.post('/createOrganization', authMiddleware, validate(organizationSchema), createOrganization);
organizationRouter.get('/getOrganization', authMiddleware, getOrganization );
organizationRouter.get('/getOrganizationById/:id', authMiddleware, getOrganizationById );

export default organizationRouter;