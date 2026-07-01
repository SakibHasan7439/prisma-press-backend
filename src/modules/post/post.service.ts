import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreatePostPayload, IUpdatePostPayload } from "./post.interface";
import { PostStatus } from "../../../generated/prisma/enums";

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

    const transactionResult = await prisma.$transaction(
        async(tx) => {
            await tx.post.update({
                where: {
                    id: postId
                },
                data: {
                    views: {
                        increment: 1
                    }
                }
            });

            const post = await tx.post.findUniqueOrThrow({
                where: {
                    id: postId
                },
                include: {
                    author: {
                        select: {
                            name: true,
                        }
                    },
                    comments: {
                        where: {
                            status: CommentStatus.APPROVED
                        },

                        orderBy: {
                            createdAt: 'desc'
                        }
                    },
                    _count: {
                        select: {
                            comments: true,
                        }
                    }
                },
            });

            return post;
        }
    );

    return transactionResult;
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
    const transactionResult = await prisma.$transaction(async (tx) => {
        const [
            totalPost,
            totalPublishedPost,
            totalDraftPost,
            totalArchivedPost,
            totalComments,
            totalApprovedComments,
            totalRejectedComments,
            totalPostViewsAggregate
        ] = await Promise.all([
            tx.post.count(),
            tx.post.count({ where: { status: PostStatus.PUBLISHED } }),
            tx.post.count({ where: { status: PostStatus.DRAFT } }),
            tx.post.count({ where: { status: PostStatus.ARCHIVED } }),
            tx.comment.count(),
            tx.comment.count({ where: { status: CommentStatus.APPROVED } }),
            tx.comment.count({ where: { status: CommentStatus.REJECT } }),
            tx.post.aggregate({ _sum: { views: true } })
        ]);
        const totalPostViews = totalPostViewsAggregate._sum.views || 0;
        return {
            totalPost,
            totalPublishedPost,
            totalDraftPost,
            totalArchivedPost,
            totalComments,
            totalApprovedComments,
            totalRejectedComments,
            totalPostViews
        };
    });
    return transactionResult;
};

const updatePostIntoDB = async(postId: string, payload: Partial<IUpdatePostPayload>, authorId: string, isAdmin: boolean ) => {

    const post = await prisma.post.findFirstOrThrow({
        where: {
            id: postId,
        }
    });

    if(!isAdmin && post.authorId !== authorId) {
        throw new Error("You are not authorized to update this post");
    }

    const result = await prisma.post.update({
        where: {
            id: postId
      },
      data: {
        ...payload
      },
        include: {
            author: {
                select: {
                    name: true,
                }
            },
            comments: true
        }
    });

    return result;
};

const deletePostFromDB = async(postId:string, authorId: string, isAdmin: boolean) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })

    if(!post) {
        throw new Error("Post not found");
    };

    if(!isAdmin && post.authorId !== authorId) {
        throw new Error("You are not authorized to delete this post");
    };

    const result = await prisma.post.delete({
        where: {
            id: postId
        }
    })

    return result;
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