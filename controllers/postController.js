import asyncHandler from "express-async-handler";
import Post from "../models/post.js";
/**
 * @desc Create new post
 * @param {*} req 
 * @param {*} res 
 * @route api/posts
 * @access private
 */

export const createPost = asyncHandler(async (req, res, next) => {
    const { title, body, author } = req.body;

    if (!title || !body || !author) {
        res.status(400);
        throw new Error("Bad request, one or more required fields are missing");
    }
    try {
        const postExists = await Post.findOne({ $and: [{ title: title }, { author: author }] });
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

/**
 * @desc Get all posts
 * @param {*} req 
 * @param {*} res 
 * @route api/posts
 * @access public
 */
export const getPosts = asyncHandler(async (req, res, next) => {
    try {
        const posts = await Post.find();
        if (posts) {
            res.status(200).send(posts);
        } else {
            res.status(404).json({ message: "No post found" });
        }
    } catch (error) {
        next(error);
    }
})


/**
 * @desc Get all posts
 * @param {*} req 
 * @param {*} res 
 * @route api/posts
 * @access public
 */
export const addLikeTOPost = asyncHandler(async (req, res, next) => {
    const post_id = req.params["id"];
    try {
        const post = await Post.findOne({ _id: post_id });
        const currentLike = post.impressions["likes"];
        post.impressions["likes"] = currentLike + 1;
        post.save();
        res.status(201).send(post);
    } catch (error) {
        next(error);
    }
})

