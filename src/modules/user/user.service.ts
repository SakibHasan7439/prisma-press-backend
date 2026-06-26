import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { RegisterUserPayload } from "./user.interface";

const registerUserIntoDB = async(payload: RegisterUserPayload) => {
    const { name, email, password, profilePhoto } = payload;
    const isUserExist = await prisma.user.findUnique({
        where: {email}
    })

    if(isUserExist){
        throw new Error("User with this email already exist");
    }

    const hashPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword,
            profile: {
                create: {
                    profilePhoto
                }
            }
        }
    })

    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email
        },
        omit: {
            password: true
        }, 
        include: {
            profile: true
        }
    })
    return user;
}

export const userService = {
    registerUserIntoDB
}