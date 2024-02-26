/**
 * @desc Auth user / set token
 * @param {*} req 
 * @param {*} res 
 * @route api/users/auth
 */
export const authUser = (req, res) => {
    res.status(200).json({ message: 'User authorized' })
}