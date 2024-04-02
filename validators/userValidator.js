import { body, checkSchema } from "express-validator";
import User from "../models/user.js";
import validator from "validator";

const checkLatLong = (value) => {
    const coordinates = value.join(", ");
    if (validator.isLatLong(coordinates.toString())) return true;
    else {
        throw new Error("Invalid address coordinates");
    }
}
const emailInUse = async (value) => {
    console.log(value)
    const user = await User.findOne({ email: value });
    if (user) {
        throw new Error(`Email id ${value} already in use`);
    } else {
        return value;
    }
}
export const userValidator = () => [
    // body('fname').isString()
    //     .isLength({ min: 3, max: 20 })
    //     .withMessage('Invalid first name'),

    // body('lname').isString()
    //     .isLength({ min: 3, max: 20 })
    //     .withMessage('Invalid last name'),

    // body('email').trim().
    //     isEmail().withMessage('Invalid email')
    //     .custom(async (email) => {
    //         const user = await User.findOne({ email: email });
    //         if (user) {
    //             throw new Error(`Email id ${email} already in use`);
    //         }
    //     }),

    // body('address.coordinates')
    //     .custom((value) => {
    //         const coordinates = value.join(", ");
    //         if (!validator.isLatLong(coordinates)) {
    //             throw new Error(`Invalid address coordinates ${coordinates}`)
    //         } else {
    //             return true;
    //         }
    //     }),

    // body('password').isLength({ min: 4 })
    //     .withMessage('Password should be at least 4 characters long'),

    checkSchema({
        fname: {
            isString: { errorMessage: "Names should be in alphabet" },
            isLength: {
                options: { min: 3, max: 20 },
                errorMessage: "Name should be at least 4 characters long and at most 20 characters long"
            }
        },
        lname: {
            isString: { errorMessage: "Names should be in alphabet" },
            isLength: {
                options: { min: 3, max: 20 },
                errorMessage: "Name should be at least 4 characters long and at most 20 characters long"
            }
        },
        email: {
            isEmail: { errorMessage: "Names should be in alphabet" },
            custom: { options: emailInUse }
        },
        'address.coordinates': {
            custom: { options: checkLatLong }
        },
        password: {
            isLength: { options: { min: 4 } },
            errorMessage: "Password should be at least 4 characters"
        }
    })
]


export const authValidator = () => [
    // body('email').trim().isEmail().withMessage("Invalid email address"),
    // body('password').notEmpty().withMessage("Password is invalid"),
    checkSchema({
        email: { isEmail: { bail: true }, errorMessage: "Invalid email address" },
        password: {
            notEmpty: { bail: true },
            isLength: { options: { min: 4 } },
            errorMessage: "Password should be at least 4 characters long"
        }
    })
]