import { body } from "express-validator";

export const postValidator = () => [
    body('title').optional().isLength({ min: 3 }).bail(true).isString()
        .withMessage("Title should be at least 3 characters long"),
    body('body').optional().isLength({ min: 8, max: 1028 })
        .withMessage("Post body should be at least 8 characters long")
]