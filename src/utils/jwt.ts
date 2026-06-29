import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from 'jsonwebtoken';

const createToken = (payload:JwtPayload, secret:string, expiresIn: string | number) => {
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
};

const verifiedToken = (token: string, secret: string) => {
    try {
        const verifiedToken = jwt.verify(token, secret);
        return {
            success: true,
            data: verifiedToken
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

export const jwtUtils = {
    createToken,
    verifiedToken
}