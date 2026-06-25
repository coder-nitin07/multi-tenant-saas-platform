import express from 'express';
import { acceptInvitation, organizationMemberInvitation } from './organizationMember.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import activeOrganizationMiddleware from '../middleware/activeOrganization.middleware.js';
import membershipValidationMiddleware from '../middleware/membershipValidation.middleware.js';
import organizationScopingMiddleware from '../middleware/oragnizationScoping.middleware.js';
import authorize from '../middleware/rbac.middleware.js';
import { PERMISSIONS } from '../../config/permission.js';
const organizationMemberRouter = express.Router();

organizationMemberRouter.post('/organizationMemberInvitation/:id/invitations', authMiddleware, activeOrganizationMiddleware, membershipValidationMiddleware, organizationScopingMiddleware, authorize(PERMISSIONS.INVITE_MEMBERS), organizationMemberInvitation);


organizationMemberRouter.post('/acceptInvitation', authMiddleware, acceptInvitation);

export default organizationMemberRouter;