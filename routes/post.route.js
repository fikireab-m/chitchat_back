import { Router } from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/")
    .get(getPosts)
    .post(protect, createPost);

export default router;
