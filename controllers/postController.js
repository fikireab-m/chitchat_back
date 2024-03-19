
import asyncHandler from "express-async-handler";
import Post from "../models/post";
/**
 * @desc Create new user
 * @param {*} req 
 * @param {*} res 
 * @route api/users/register
 * @access public
 */


export const createPost = asyncHandler(async (req, res, next) => {
    const { title, body, author } = req.body;

    if (!title || !body || !author) {
        res.status(400);
        throw new Error("Bad request, missing fields");
    }
    try {
        const postExists = Post.find({ title, author });
        if (postExists) {
            res.status(400);
            throw new Error("Post with same title by same author already exists");
        }
        const post = await Post.create({ title, body, author });
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
})