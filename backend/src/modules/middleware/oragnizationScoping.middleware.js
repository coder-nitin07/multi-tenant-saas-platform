import prisma from "../../config/prisma";
import AppError from "../../utils/AppError";

const organizationScopingMiddleware = async (req, res, next)=>{
    try {
        const userId  = req.user.id;
        const organizationId = req.organization.id;
        const organizationName = req.organization.name;
        const role = req.membership.role;

        req.scope = { userId, organizationId, organizationName, role };
        next();
    } catch (err) {
        next(err);
    }
};

export default organizationScopingMiddleware;