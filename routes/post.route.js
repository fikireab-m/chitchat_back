import { Router } from "express";
import { addLikeTOPost, createPost, getPosts } from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { createComment, getPostComments } from "../controllers/commentController.js";

const router = Router();

router.route("/")
    .get(getPosts)
    .post(protect, createPost);
router.route("/:id")
    .get(getPostComments)
    .put(protect, addLikeTOPost)
    .post(protect, createComment);

export default router;
