import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";

const activeOrganizationMiddleware = async (req, res, next)=>{
    try {
        const organizationId = req.headers["x-organization-id"] || req.params.id;
        if(!organizationId){
            return next(new AppError('Please provide organization Id', 401));
        }

        const validateOrganizationId = await prisma.organization.findUnique({
            where: { id: organizationId }
        });
        if(!validateOrganizationId){
            return next(new AppError('Organization not found', 401));
        }

        req.organization = validateOrganizationId;
        next();
    } catch (err) {
        next(new AppError('Invalid Organization Id', 403));
    }
};

export default activeOrganizationMiddleware;