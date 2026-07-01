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

const getPostByIdFromDB = async(postId: string) => {
    const singlePost = await prisma.post.findUnique({
        where: {
            id: postId
        },
    });

    const updatePost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            views: {
                increment: 1
            }
        },
         include: {
            author: {
                select: {
                    name: true,
                }
            },
            comments: true
        },
    });
    
    return updatePost;
};


const getMyPostFromDB = async(authorId: string) => {
    const myPosts = await prisma.post.findMany({
        where: {
            authorId
        },

        orderBy: {
            createdAt: 'desc'
        },
        include: {
            comments: true,
            author: {
                omit: {
                    password: true,
                }
            },
            _count: {
                select: {
                    comments: true,
                }
            }
        }
    });
    return myPosts;
};

const getPostsStatsFromDB = async() => {

};

const updatePostIntoDB = async() => {

};

const deletePostFromDB = async() => {

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