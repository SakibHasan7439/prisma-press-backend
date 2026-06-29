import { NextFunction, Request, Response } from "express";

import httpStatus from 'http-status';

import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { prisma } from "../lib/prisma";


declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string;
                name: string;
                id: string;
                role:Role
            }
        }
    }
}

export const auth = (...requiredRoles : Role[]) => {
    return catchAsync(async(req:Request, res:Response, next:NextFunction) => {
        const token = req.cookies.accessToken 
        ? req.cookies.accessToken 
        : req.headers.authorization?.startsWith("Bearer") 
        ? req.headers.authorization?.split(" ")[1] 
        : req.headers.authorization;

        const verifiedToken = jwtUtils.verifiedToken(token as string, config.jwt_access_secret as string);

        if(!verifiedToken.success){
            throw new Error(verifiedToken.error);
        }

        const { name, email, id, role } = verifiedToken.data as JwtPayload;

        if(requiredRoles.length && !requiredRoles.includes(role)){
            throw new Error("Forbidden! You don't have the permission to access this resource")
        }

        const user = await prisma.user.findUnique({
            where: {
                id,
                email,
                name, 
                role
            }
        });

        if(!user){
            throw new Error("User not found! Please login again");
        };

        if(user.activeStatus === "BLOCKED"){
            throw new Error("Your account is blocked! please contact support");    
        };

        req.user = {
            id,
            email,
            name, 
            role
        }

        next();
    });
}
