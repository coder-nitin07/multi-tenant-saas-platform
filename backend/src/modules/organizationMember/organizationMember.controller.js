import { AUDIT_ACTION } from "../../config/auditAction.js";
import { ROLES } from "../../config/permission.js";
import prisma from "../../config/prisma.js";
import emailQueue from "../../queues/email.queue.js";
import createAuditLog from "../../services/audit.service.js";
import AppError from "../../utils/AppError.js";
import crypto from 'crypto';

// member invitation
const organizationMemberInvitation = async (req, res, next)=>{
    try {
        const organizationId = req.params.id;
        const { email } = req.body;

         // user should not be a memeber of the existing organiation
        const checkUserExist = await prisma.user.findFirst({
            where: { email }
        });
        if(!checkUserExist){
            return next(new AppError('User not exist', 404));
        }

        const checkNotExistingMember = await prisma.organizationMember.findFirst({
            where: { userId: checkUserExist.id, organizationId }
        });
        if(checkNotExistingMember){
            return next(new AppError('User already member of the Organization', 409));   
        }

        // check invitation already send to the User
        const checkExistingInvitation = await prisma.invitation.findFirst({
            where: { email, status: 'PENDING', organizationId }
        });
        if(checkExistingInvitation){
            return next(new AppError('User already invited', 422));
        }

        // create token
        const token = crypto.randomBytes(32).toString('hex');
        
        // invite User
        const inviteUser = await prisma.invitation.create({
            data: {
                email,
                organizationId,
                invitedBy: req.scope.userId,
                token,
                expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            }
        });

        await emailQueue.add("send-invitation-email", {
            invitationId: inviteUser.id,
            email,
            token,
            organizationId
        });

        await createAuditLog({
            organizationId,
            actorId: req.user.id,
            action: AUDIT_ACTION.INVITATION_SENT,
            targetUserId: checkUserExist.id,
            metadata: {
                email
            }
        });

        res.status(201).json({
            message: 'Invitation created successfully',
            user: inviteUser
        });
    } catch (err) {
        next(err);
    }
};

// accept Invitation
const acceptInvitation = async (req, res, next)=>{
    try {
        const token = req.body.token;
        if(!token){
            return next(new AppError('Token missing', 404));
        }

        // Check the Invitation
        const getInvitationToken = await prisma.invitation.findFirst({
            where: { token }
        });
        if(!getInvitationToken){
            return next(new AppError('Invitation not found', 404));
        }

        // check the invitaiton status
        if(getInvitationToken.status !== 'PENDING') {
            return next(new AppError('Invitation failed', 404));
        }

        
        // check invitation expiry
        const expiryToken = getInvitationToken.expiresAt;
        if(new Date() > expiryToken){
            return next(new AppError('invitation Token expired', 410));
        }
        
        // check the User valid to get the acceptance
        const getInvitationEmail = getInvitationToken.email;
        const requestEmail = req.user.email;
        
        if(getInvitationEmail !== requestEmail){
            return next(new AppError('You cannot accept this Invitation', 403));
        }

        // check the Member
        const userId = req.user.id;
        const organizationId = getInvitationToken.organizationId;

        const checkTheUserAlreadyMember = await prisma.organizationMember.findFirst({
            where: { userId, organizationId }
        });
        if(checkTheUserAlreadyMember){
            return next(new AppError('User already exist in Organization', 409));
        }

        // ctransaction
        const result = await prisma.$transaction(async (tx)=>{

            // create organizationMember
            const organizationMemberCreation = await tx.organizationMember.create({
                data: {
                    userId,
                    organizationId,
                    role: ROLES.MEMBER
                }
            });


            // update the Invitation to Acceptance
            const changeInvitation = await tx.invitation.update({
                where: {
                    id: getInvitationToken.id
                },
                data: {
                    status: 'ACCEPTED'
                }
            });

            return { organizationMemberCreation, changeInvitation };
        });

        await createAuditLog({
            organizationId,
            actorId: userId,
            action: AUDIT_ACTION.INVITATION_ACCEPTED,
            targetUserId: userId,
            metadata: {
                invitationId: getInvitationToken.id
            }
        });

        res.status(200).json({
            message: 'User become the Member to the Organization',
            organization: result.organizationMemberCreation,
            invitationUpdate: result.changeInvitation
        });
    } catch (err) {
        next(err);
    }
};

// get organization audit logs
const getOrganizationAuditLogs = async (req, res, next) => {
    try {

        const organizationId = req.params.id;
        console.log("ora", organizationId);
        const auditLogs = await prisma.auditLog.findMany({
            where: {
                organizationId
            },
            include: {
                actor: {
                    select: {
                        id: true,
                        email: true
                    }
                },
                target: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        res.status(200).json({
            message: "Audit logs fetched successfully",
            count: auditLogs.length,
            data: auditLogs
        });

    } catch (err) {
        next(err);
    }
};

export { organizationMemberInvitation, acceptInvitation, getOrganizationAuditLogs }