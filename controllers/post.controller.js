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
    const { title, body } = req.body;
    const author = req.user._id;
    try {
        const postExists = await Post.findOne(
            { $and: [{ title: title }, { author: author }] });
        if (postExists) {
            res.status(400);
            throw new Error("Post with same title by same author already exists");
        }
        const post = await Post.create({ title, body, author });
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
});

/**
 * @desc Delete a post
 * @param {*} req 
 * @param {*} res 
 * @route api/posts/:id
 * @access private
 */
export const deletePost = asyncHandler(async (req, res, next) => {
    const post_id = req.params["id"];
    const user_id = req.user._id;
    try {
        const post = await Post.findById(post_id);
        if (!post) {
            res.status(404).json({ message: `No post found with id ${post_id}` });
        } else {
            if (post.author.toString().trim() === user_id.toString().trim()) {
                const postDeleted = await Post.deleteOne({ _id: post_id });
                if (postDeleted) res.status(200).json({ message: `Post with id ${post_id} was deleted successfully` });
            } else {
                res.status(401).json({ message: "Not authorized" });
            }
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @desc update a post
 * @param {*} req 
 * @param {*} res 
 * @route api/posts/:id
 * @access private
 */
export const updatePost = asyncHandler(async (req, res, next) => {
    const post_id = req.params["id"];
    const user_id = req.user._id;

    const { title, body } = req.body;

    try {
        const post = await Post.findById(post_id);
        if (!post) res.status(404).json({ message: `No post found with id ${post_id}` });
        if (post.author.toString().trim() === user_id.toString().trim()) {
            post.title = title || post.title;
            post.body = body || post.body;

            post.save();
            res.status(201).send(post);
        } else {
            res.status(401).json({ message: "Not authorized" })
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @desc Get all posts
 * @param {*} req 
 * @param {*} res 
 * @route api/posts
 * @access public
 */
export const getPosts = asyncHandler(async (req, res, next) => {
    let { page, pageSize } = req.query;
    try {
        page = parseInt(page, 10) || 1;
        pageSize = parseInt(pageSize, 10) || 3;

        // const totalCount = await Post.find().count();
        // const posts = await Post.find()
        //     .limit(pageSize).skip((page - 1) * pageSize);

        const posts = await Post.aggregate([
            {
                $facet: {
                    metadata: [{ $count: 'totalCount' }],
                    data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
                },
            },
        ]);
        res.status(200).json({
            posts: {
                metadata: {
                    totalCount: posts[0].metadata[0].totalCount, page, pageSize
                },
                data: posts[0].data,
            }
        });
    } catch (error) {
        next(error);
    }
});


/**
 * @desc Toggle like of a post
 * @param {*} req 
 * @param {*} res 
 * @route api/posts
 * @access private
 */
export const toggleLikeTOPost = asyncHandler(async (req, res, next) => {
    const post_id = req.params["id"];
    const user_id = req.user._id;
    try {
        const post = await Post.findOne({ _id: post_id });
        const currentLike = post.impressions["likes"];

        if (!currentLike.includes(user_id)) {
            currentLike.push(user_id)
        } else {
            currentLike.remove(user_id);
        }

        post.impressions["likes"] = currentLike;
        post.save();
        res.status(201).send(post);
    } catch (error) {
        next(error);
    }
});
