import { Router } from "express";
import { addLikeTOPost, createPost, getPosts } from "../controllers/post.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import { createComment, getPostComments } from "../controllers/comment.controller.js";

const router = Router();

router.route("/")
    .get(getPosts)
    .post(protect, createPost);
router.route("/:id")
    .get(getPostComments)
    .put(protect, addLikeTOPost)
    .post(protect, createComment);

export default router;
