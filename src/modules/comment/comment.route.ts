import { Router } from "express";
import { commentController } from "./comment.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
    "/", 
    auth(Role.ADMIN, Role.AUTHOR, Role.USER),
    commentController.createComment
);

router.get("/:id", commentController.getCommentsById);

router.patch("/:commentId",
    auth(Role.ADMIN, Role.AUTHOR, Role.USER),
    commentController.updateComments
);

router.delete("/:commentId",
    auth(Role.ADMIN, Role.AUTHOR, Role.USER),
    commentController.deleteComments
);

router.get(
    "/author/:authorId", 
    commentController.getCommentsByAuthorId
);
router.put(
    "/:commentId/moderate", 
    auth(Role.ADMIN),
    commentController.updateCommentStatusByAdmin
);

export const commentRoutes = router;