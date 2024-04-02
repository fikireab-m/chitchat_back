import { body } from "express-validator";

export const postValidator = () => [
    body('title').isLength({ min: 3 }).bail(true).isString()
        .withMessage("Title should be at least 3 characters long"),
    body('body').isLength({ min: 8, max: 1028 }).bail(true)
        .withMessage("Post body should be at least 8 characters long")
]