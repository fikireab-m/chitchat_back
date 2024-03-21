
import asyncHandler from "express-async-handler";
import Comment from "../models/comment.js";
/**
 * Create a new comment
 * @access private
 * @route api/post/:id
 * @param req
 * @param res
 */
export const createComment = asyncHandler(async (req, res, next) => {
    console.log(req.params)
    const { post, user, body } = req.body;
    if (!post || !user || !body) {
        throw new Error("One or more required fields are missing");
    }
    const commentExists = await Comment.findOne({ $and: [{ user: user }, { post: post }, { body: body }] });
    if (commentExists) {
        throw new Error("Comment already exists");
    }
    await Comment.create({ post, user, body }).then((comment) => {
        res.status(201).send(comment);
    })
});

/**
 * Get comments of a post
 * @access public
 * @route api/post/:id
 * @param req
 * @param res
 */
export const getPostComments = asyncHandler(async (req, res, next) => {
    const postId = req.params["id"];
    try {
        const comments = await Comment.find({ post: postId });
        if (comments) {
            res.status(200).json({comments});
        } else {
            res.status(404).json({ message: "No comments found" });
        }
    } catch (error) {
        next(error);
    }
});

