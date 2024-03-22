import asyncHandler from "express-async-handler";
import Reply from "../models/reply.js";
import Comment from "../models/comment.js";

/**
 * @desc Create new reply
 * @param {*} req 
 * @param {*} res 
 * @route api/posts/:id/:comment_id
 * @access private
 */

export const createReply = asyncHandler(async (req, res, next) => {

    const { user, body } = req.body;
    const comment_id = req.params["comment_id"];

    if (!comment_id || !body || !user) {
        res.status(400);
        throw new Error("Bad request, one or more required fields are missing");
    }
    try {
        const replyExists = await Reply.findOne({
            $and: [
                { user: user }, { body: body }, { comment: comment_id }
            ]
        });
        if (replyExists) {
            res.status(400);
            throw new Error("Duplicate reply");
        }
        const reply = await Reply.create({ comment: comment_id, body, user });

        const comment = await Comment.findOne({ _id: comment_id });
        const reps = comment.impressions["replies"];
        reps.push(reply._id);
        comment.impressions["replies"] = reps;
        comment.save();
        res.status(201).json(reply);
    } catch (error) {
        next(error);
    }
});

/**
 * @desc Get replies
 * @param {*} req 
 * @param {*} res 
 * @route api/posts/:id/:comment_id
 * @access public
 */
export const getReplies = asyncHandler(async (req, res, next) => {
    const comment_id = req.params["comment_id"];
    try {
        const replies = await Reply.find({ comment: comment_id });
        if (replies) {
            res.status(200).json(replies);
        } else {
            res.status(404).json({ message: "No replies found" });
        }
    } catch (error) {
        next(error);
    }
});


/**
 * @desc Toggle like of a reply
 * @param {*} req 
 * @param {*} res 
 * @route api/posts/
 * @access private
 */
export const toggleLikeTOReply = asyncHandler(async (req, res, next) => {
    const reply_id = req.params["reply_id"];
    const user_id = req.params["user_id"]
    try {
        const reply = await Reply.findOne({ _id: reply_id });
        const currentLike = reply.likes;

        if (!currentLike.includes(user_id)) {
            currentLike.push(user_id)
        } else {
            currentLike.remove(user_id);
        }

        reply.likes = currentLike;
        reply.save();
        res.status(201).send(reply);
    } catch (error) {
        next(error);
    }
})