import asyncHandler from "express-async-handler";
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