import prisma from "../../config/prisma.js";
import { redisClient } from "../../config/redis.js";
import AppError from "../../utils/AppError.js";

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

// get organizations of an User
const getOrganization = async (req, res, next) =>{
    try {
        const userId = req.user.id;

        const getOrganizations = await prisma.organizationMember.findMany({
            where: { userId },
            select: {
                role: true,

                organization: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        if(getOrganizations.length === 0){
            return res.status(200).json({ 
                message: 'No Organizaton found',
                getOrganizations: []
            });
        }
        
        res.status(200).json({
            getOrganizations
        });
    } catch (err) {
        next(err);
    }
};

// get organization by Id
const getOrganizationById = async (req, res, next) =>{
    try {
        const userId = req.user.id;
        const organizationId = req.params.id;

        // create cacheKey
        const cacheKey = `membership:${ userId }:${ organizationId }`;
        const cachedData = await redisClient.get(cacheKey);

        if(cachedData){
            return res.status(200).json({
                message: 'Organization Data Fetched Successfully (Cache)',
                data: JSON.parse(cachedData)
            });
        }

        const getTheOrganization = await prisma.organizationMember.findFirst({
            where: { userId, organizationId },
            select: {
                id: true,
                role: true,
                organization: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        if(!getTheOrganization){
            throw new AppError('You did not belong to this Organization', 403);
        }


        // set the redis cache
        await redisClient.set(cacheKey, JSON.stringify(getTheOrganization), {
            EX: 300
        });

        res.status(200).json({
            message: 'Organization Data Fetched Successfully',
            data: getTheOrganization
        });
    } catch (err) {
        next(err);
    }
};

// get organization members
const getOrganizationMembers = async (req, res, next)=>{
    try {
        const organizationId = req.params.id;

        const fetchMembers = await prisma.organizationMember.findMany({
            where: {
                organizationId
            },
            select: {
                id: true,
                role: true,
                createdAt: true,

                user: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        res.status(200).json({
            message: "Organization members fetched successfully",
            count: fetchMembers.length,
            members: fetchMembers
        });
    } catch (err) {
        next(err);
    }
};

export { createOrganization, getOrganization, getOrganizationById, getOrganizationMembers };