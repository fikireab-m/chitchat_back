import { body } from "express-validator";
import User from "../models/user.js";
import validator from "validator";

export const userValidator = () => [
    body('fname').isString()
        .isLength({ min: 3, max: 20 })
        .withMessage('Invalid first name'),

    body('lname').isString()
        .isLength({ min: 3, max: 20 })
        .withMessage('Invalid last name'),

    body('email').trim().
        isEmail().withMessage('Invalid email')
        .custom(async (email) => {
            const user = await User.findOne({ email: email });
            if (user) {
                throw new Error(`Email id ${email} already in use`);
            }
        }),

    body('address.coordinates')
        .custom((value) => {
            const coordinates = value.join(", ");
            if (!validator.isLatLong(coordinates)) {
                throw new Error(`Invalid address coordinates ${coordinates}`)
            } else {
                return true;
            }
        }),

    body('password').isLength({ min: 4 })
        .withMessage('Password should be at least 4 characters long'),
]


export const authValidator = () => [
    body('email').trim().isEmail().withMessage("Invalid email address"),
    body('password').notEmpty().withMessage("Password is invalid")
]