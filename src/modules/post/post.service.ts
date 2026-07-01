import { prisma } from "../../lib/prisma";
import { ICreatePostPayload } from "../comment/comment.interface";

const createPostIntoDB = async(payload:ICreatePostPayload, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...payload,
            authorId: userId
        }
    });

    return result;
};

const getAllPostsFromDB = async() => {
    const allPosts = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    name: true,
                }
            },
            comments: true
        },
    });

    return allPosts;
};

const getPostByIdFromDB = async() => {

};

const getPostsStatsFromDB = async() => {

};

const updatePostIntoDB = async() => {

};

const deletePostFromDB = async() => {

};

const getMyPostFromDB = async() => {

};

export const postService = {
    createPostIntoDB,
    getAllPostsFromDB,
    getPostByIdFromDB,
    getPostsStatsFromDB,
    updatePostIntoDB,
    deletePostFromDB,
    getMyPostFromDB,
}