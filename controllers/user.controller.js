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
export const registerUser = asyncHandler(
    async (req, res) => {
        const { fname, lname, email, address, avatar, password } = req.body;

        const user = await User.create({
            fname, lname, email, address, password, avatar
        });
        if (user) {
            generateToken(res, user._id);
            res.status(201).send(user);
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

export const getUsers = asyncHandler(async (req, res, next) => {
    let { page, limit } = req.query;
    try {
        page = parseInt(page, 10) || 1;
        limit = parseInt(limit, 10) || 2;
        const users = await User.aggregate([
            {
                $facet: {
                    metadata: [{ $count: "totalUsers" }],
                    data: [{ $skip: (page - 1) * limit }, { $limit: limit }]
                }
            }
        ]);
        res.status(200).json({
            users: {
                metadata: {
                    totalUsers: users[0].metadata[0].totalUsers, page, limit
                },
                data: users[0].data
            }
        })
    } catch (error) {
        next(error)
    }

});

/**
 * @desc Get user by id
 * @param {*} req 
 * @param {*} res 
 * @route api/users/:id
 * @access public
 */

export const getUser = asyncHandler(async (req, res) => {
    const user_id = req.params['id'];
    const user = await User.findById({ _id: user_id });
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('No user found');
    }
});


/**
 * @desc Get user by id
 * @param {*} req 
 * @param {*} res 
 * @route api/users/:id
 * @access public
 */

export const getNearbyUsers = asyncHandler(async (req, res) => {
    const currentUser = req.user;
    const centerPoint = currentUser.address.coordinates;
    if (centerPoint) {
        const nearbyUsers = await User.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: centerPoint },
                    distanceField: "dist.calculated",
                    maxDistance: 10000,//in meter
                    includeLocs: "dist.location",
                    spherical: true
                }
            },
            {
                $match: { _id: { $ne: currentUser._id } }
            }
        ]);
        if (nearbyUsers) {
            res.status(200).send(nearbyUsers);
        } else {
            res.status(404).json({ message: "No users nearby" });
        }
    } else {
        res.status(403);
        throw new Error('User coordinates aren\'t valid');
    }
});
