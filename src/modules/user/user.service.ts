import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { RegisterUserPayload } from "./user.interface";

const registerUserIntoDB = async(payload: RegisterUserPayload) => {
    const { name, email, role, password, profilePhoto } = payload;
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
            role,
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

const getMyProfileFromDB = async(userId: string) => {
    const user = await prisma.user.findFirstOrThrow({
        where: {id: userId},
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    });

    return user;
}

const updateMyProfileIntoDB = async(userId:string, payload: any) =>{
    const {name, email, profilePhoto, bio} = payload;

    const updateUser = await prisma.user.update({
        where: {id: userId},

        data: {
            name,
            email,
            profile: {
                update: {
                    profilePhoto,
                    bio
                }
            }
        },
        omit: {
            password:true
        },
        include: {
            profile: true
        }
    });

    return updateUser;
}

export const userService = {
    registerUserIntoDB,
    getMyProfileFromDB,
    updateMyProfileIntoDB
}