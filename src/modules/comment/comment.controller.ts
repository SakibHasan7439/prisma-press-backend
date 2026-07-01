import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { commentService } from "./comment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';

const createComment = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
    const {content, postId} = req.body;
    const result = await commentService.createCommentIntoDB({
        content,
        postId,
        authorId: req.user?.id as string
    });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Comment created successfully",
        data: result
    })
});

const getCommentsById = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
    
})

const getCommentsByAuthorId = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
    
})

const updateComments = catchAsync(async(req:Request, res:Response, next:NextFunction) => {

})

const updateCommentStatusByAdmin = catchAsync(async(req:Request, res:Response, next:NextFunction) => {

})

const deleteComments = catchAsync(async(req:Request, res:Response, next:NextFunction) => {

})


export const commentController = {
    createComment,
    getCommentsById,
    getCommentsByAuthorId,
    updateComments,
    updateCommentStatusByAdmin,
    deleteComments
}