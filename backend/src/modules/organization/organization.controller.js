import prisma from "../../config/prisma.js";

// create organization
const createOrganization = async (req, res, next)=>{
    try {
        const { name } = req.body;
        const user  = req.user.id;

        // prisma transaction
        const result = await prisma.$transaction(async (tx) =>{
            
            // create organization
            const organization = await tx.organization.create({
                data: {
                    name
                },
                select: {
                    id: true,
                    name: true
                }
            });

            // create organization owner
            const organizationOwner = await tx.organizationMember.create({
                data: {
                    userId: user,
                    organizationId: organization.id,
                    role: 'OWNER'
                },
                select: {
                    id: true,
                    userId: true,
                    organizationId: true,
                    role: true
                }
            });

            return { organization, organizationOwner };
        });

        res.status(201).json({
            message: 'Organization created successfully',
            organization: result.organization,
            organization_member: result.organizationOwner
        });
    } catch (err) {
        next(err);
    }
};

export { createOrganization };