import asyncHandler from "express-async-handler";
import Reply from "../models/reply.js";
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
        res.status(201).json(reply);
    } catch (error) {
        next(error);
    }
});