import { Router } from "express";
import { commentController } from "./comment.controller";

const router = Router();

router.post("/", commentController.createComment);
router.get("/", commentController.getComments);
router.put("/:commentId", commentController.updateComments);
router.delete("/:commentId", commentController.deleteComments);

router.get("/author/:authorId", commentController.getCommentsByAuthorId);
router.put("/:commentId/moderate", commentController.updateCommentStatusByAdmin);

export const commentRoutes = router;