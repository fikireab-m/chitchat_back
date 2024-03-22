
import asyncHandler from "express-async-handler";
import Comment from "../models/comment.js";
import Post from "../models/post.js";
/**
 * Create a new comment
 * @access private
 * @route api/post/:id
 * @param req
 * @param res
 */
export const createComment = asyncHandler(async (req, res, next) => {
    const post_id = req.params["id"];
    const { user, body } = req.body;
    if (!post_id || !user || !body) {
        throw new Error("One or more required fields are missing");
    }
    const commentExists = await Comment.findOne({ $and: [{ user: user }, { post: post_id }, { body: body }] });
    if (commentExists) {
        throw new Error("Comment already exists");
    }

    try {
        const comment = await Comment.create({ post: post_id, user, body });
        if (comment) {
            const post = await Post.findOne({ _id: post_id });
            const currentComments = post.impressions["comments"];
            currentComments.push(comment._id);
            post.impressions["comments"] = currentComments;
            post.save();
            res.status(201).send(comment);
        }
    } catch (error) {
        next(error);
    }
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
            res.status(200).send(comments);
        } else {
            res.status(404).json({ message: "No comments found" });
        }
    } catch (error) {
        next(error);
    }
});


/**
 * @desc Toggle like of a comment
 * @param {*} req 
 * @param {*} res 
 * @route api/posts
 * @access private
 */
export const toggleLikeTOComment = asyncHandler(async (req, res, next) => {
    const comment_id = req.params["comment_id"];
    const user_id = req.params["user_id"]
    try {
        const comment = await Comment.findOne({ _id: comment_id });
        const currentLike = comment.impressions["likes"];

        if (!currentLike.includes(user_id)) {
            currentLike.push(user_id)
        } else {
            currentLike.remove(user_id);
        }

        comment.impressions["likes"] = currentLike;
        comment.save();
        res.status(201).send(comment);
    } catch (error) {
        next(error);
    }
})
