import { Router } from "express";
import { toggleLikeTOPost, createPost, getPosts } from "../controllers/post.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import { createComment, getPostComments } from "../controllers/comment.controller.js";
import { createReply, getReplies } from "../controllers/reply.controller.js";

const router = Router();

router.route("/")
    .get(getPosts)
    .post(protect, createPost);
    
router.route("/:id")
    .get(getPostComments)
    .post(protect, createComment);

router.route("/:id/:user_id")
    .put(protect, toggleLikeTOPost);

router.route("/:id/:comment_id")
    .post(protect, createReply)
    .get(getReplies);

export default router;
