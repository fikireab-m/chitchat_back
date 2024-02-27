import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

/**
 * @desc Create new user
 * @param {*} req 
 * @param {*} res 
 * @route api/users/register
 * @access public
 */
export const registerUser = asyncHandler(async (req, res) => {
    const { fname, lname, email, password } = req.body;
    if (fname && lname && email && password) {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error(`Email id - ${email} is already in use`)
        }

        const user = await User.create({ fname, lname, email, password });
        if (user) {
            generateToken(res, user._id);
            res.status(201).send(user);
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

/**
 * @desc Auth user / set token to null
 * @param {*} req 
 * @param {*} res 
 * @route api/users/auth
 * @access public
 */
export const logOut = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'User logged out' })
})

/**
 * @desc Get user profile
 * @param {*} req 
 * @param {*} res 
 * @route api/users/profile
 * @access private
 */
export const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'User profile' })
})

/**
 * @desc Update user profile
 * @param {*} req 
 * @param {*} res 
 * @route api/users/profile
 * @access private
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'User Profile update' })
})


/**
 * @desc Auth user / set token
 * @param {*} req 
 * @param {*} res 
 * @route api/users/auth
 */
export const authUser = asyncHandler(async (req, res) => {
    // res.status(401);
    // throw new Error('Something went wrong');
    res.status(200).json({ message: 'User authorized' })
})
