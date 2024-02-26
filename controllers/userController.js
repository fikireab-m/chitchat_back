import asyncHandler from "express-async-handler";

/**
 * @desc Create new user
 * @param {*} req 
 * @param {*} res 
 * @route api/users/register
 * @access public
 */
export const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'User registered' })
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
