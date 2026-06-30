import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const createComment = catchAsync(async(req:Request, res:Response, next:NextFunction) => {

});

const getComments = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
    
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
    getComments,
    getCommentsByAuthorId,
    updateComments,
    updateCommentStatusByAdmin,
    deleteComments
}