import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";

const membershipValidationMiddleware = async (req, res, next)=>{
    try {
        const userId = req.user.id;
        const organizationId  = req.organization?.id ?? req.params.id;

        const getTheOrganization = await prisma.organizationMember.findFirst({
            where: { userId, organizationId }
        });
        if(!getTheOrganization){
            return next(new AppError('You did not belong to this Organization', 403));
        }

        req.membership = getTheOrganization;
        next();
    } catch (err) {
        next(err);
    }
};

export default membershipValidationMiddleware;