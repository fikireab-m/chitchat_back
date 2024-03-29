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
    const { fname, lname, email, avatar, password } = req.body;
    if (fname && lname && email && password) {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error(`Email id - ${email} is already in use`)
        }

        const user = await User.create({ fname, lname, email, password, avatar });
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
});


/**
 * @desc Auth user / set token
 * @param {*} req 
 * @param {*} res 
 * @route api/users/auth
 */
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!email || !password) {
        res.status(401);
        throw new Error('Email and password are required');
    }
    if (user && (await user.matchPasswords(password))) {
        generateToken(res, user._id);
        res.status(200).send(user);
    } else {
        res.status(400);
        throw new Error('Invalid credential');
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
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: 'User logged out' })
});

/**
 * @desc Get user profile
 * @param {*} req 
 * @param {*} res 
 * @route api/users/profile
 * @access private
 */
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        fname: req.user.fname,
        lname: req.user.lname,
        email: req.user.email,
        avatar: req.user.avatar
    }
    res.status(200).json(user);
})

/**
 * @desc Delete user profile
 * @param {*} req 
 * @param {*} res 
 * @route api/users/profile
 * @access private
 */
export const deleteProfile = asyncHandler(async (req, res) => {
    await User.deleteOne({ _id: req.user._id });
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: `User with id ${req.user_id} deleted` });
})

/**
 * @desc Update user profile
 * @param {*} req 
 * @param {*} res 
 * @route api/users/profile
 * @access private
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
    const { fname, lname, email, avatar } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
        user.fname = fname || user.fname;
        user.lname = lname || user.lname;
        user.email = email || user.email;
        user.avatar = avatar || user.avatar;

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            fname: updatedUser.fname,
            lname: updatedUser.lname,
            email: updatedUser.email,
            avatar: updatedUser.avatar
        });

    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

/**
 * @desc Get users
 * @param {*} req 
 * @param {*} res 
 * @route api/users/
 */

export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    if (users) {
        res.status(200).json(users);
    } else {
        res.status(404);
        throw new Error('No users found');
    }
});

/**
 * @desc Get users
 * @param {*} req 
 * @param {*} res 
 * @route api/users/
 */

export const getUser = asyncHandler(async (req, res) => {
    const user_id = req.params['id'];
    const user = await User.find({ _id: user_id });
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('No user found');
    }
});
