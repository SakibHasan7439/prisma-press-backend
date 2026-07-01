import { prisma } from "../../lib/prisma";
import { ICreateCommentPayload } from "./comment.interface";

const createCommentIntoDB = async(payload: ICreateCommentPayload) => {
    const post = await prisma.post.findUnique({
        where: {
            id: payload.postId
        }
    });

    if(!post) {
        throw new Error("Post not found");
    }
    
    const result = await prisma.comment.create({
        data: {
            ...payload
        }
    });
    return result;
};

const getCommentsByAuthorIdFromDB = async() => {

};

const getCommentByIdFromDB = async() => {

};

const updateCommentsIntoDB = async() => {

};

const deleteCommentsFromDB = async() => {

};

const updateCommentsByAdminIntoDB = async() => {

};


export const commentService = {
    createCommentIntoDB,
    getCommentsByAuthorIdFromDB,
    getCommentByIdFromDB,
    updateCommentsIntoDB,
    deleteCommentsFromDB,
    updateCommentsByAdminIntoDB
}