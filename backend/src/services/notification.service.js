import prisma from "../config/prisma.js";

const createNotification = async ({ userId, organizationId, type, title, message, metadata = {} }) => {
    return await prisma.notification.create({
        data: {
            userId,
            organizationId,
            type,
            title,
            message,
            metadata
        }
    });
};

export { createNotification };