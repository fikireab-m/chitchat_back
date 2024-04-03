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
import { postValidator } from "../validators/postValidator.js";
import { parseError } from "../validators/errorParser.js";

const router = Router();

router.route("/")
    .get(getPosts)
    .post(protect, postValidator(), parseError, createPost);

router.route("/:id")
    .get(getPostComments)
    .post(protect, createComment)
    .patch(protect, toggleLikeTOPost)
    .put(protect, postValidator(), parseError, updatePost)
    .delete(protect, deletePost)

router.route("/:id/:comment_id")
    .post(protect, createReply)
    .get(getReplies)
    .put(protect, toggleLikeTOComment);

router.put("/:id/:comment_id/:reply_id", protect, toggleLikeTOReply);

export default router;
