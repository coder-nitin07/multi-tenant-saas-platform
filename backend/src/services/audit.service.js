import prisma from "../config/prisma.js";

const createAuditLog = async ({ organizationId, actorId, action, targetUserId = null, metadata = null })=>{
    const auditLog = await prisma.auditLog.create({
        data:{
            organizationId,
            actorId,
            action,
            targetUserId,
            metadata
        }
    });

    return auditLog;
};

export default createAuditLog;