import { Router } from "express";
import {
    toggleLikeTOPost,
    createPost,
    getPosts,
    deletePost,
    updatePost
} from "../controllers/post.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
    createComment,
    getPostComments,
    toggleLikeTOComment
} from "../controllers/comment.controller.js";
import {
    createReply,
    getReplies,
    toggleLikeTOReply
} from "../controllers/reply.controller.js";

const router = Router();

router.route("/")
    .get(getPosts)
    .post(protect, createPost);

router.route("/:id")
    .get(getPostComments)
    .post(protect, createComment)
    .patch(protect, toggleLikeTOPost)
    .put(protect, updatePost)
    .delete(protect, deletePost)

router.route("/:id/:comment_id")
    .post(protect, createReply)
    .get(getReplies)
    .put(protect, toggleLikeTOComment);

router.route("/:id/:comment_id/:reply_id")
    .put(protect, toggleLikeTOReply);

export default router;
