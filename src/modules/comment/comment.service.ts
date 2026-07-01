import { prisma } from "../../lib/prisma";
import { ICreatePostPayload } from "./comment.interface";

const createCommentIntoDB = async() => {

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