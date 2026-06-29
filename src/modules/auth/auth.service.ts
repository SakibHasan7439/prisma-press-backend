import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUserPayload } from "./auth.interface";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const loginUser = async(payload: ILoginUserPayload) => {
    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
            where: {email}
        }
    );

    if(user.activeStatus === "BLOCKED"){
        throw new Error("Your account is blocked! please contact support");    
    };

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if(!isPasswordMatched){
        throw new Error("Password is Incorrect");
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string);

    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret as string,config.jwt_refresh_expires_in as string)

    return {
        accessToken,
        refreshToken
    };
};

const refreshToken = async(payload: string) => {
    const verifiedRefreshToken = jwtUtils.verifiedToken(payload, config.jwt_refresh_secret as string);
    if(!verifiedRefreshToken.success){
        throw Error(verifiedRefreshToken.error);
    }
    const {id}= verifiedRefreshToken.data as JwtPayload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {id}
    });

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_refresh_expires_in as string
    );

    return {accessToken};
}

export const authService = {
    loginUser,
    refreshToken
}