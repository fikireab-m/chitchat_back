import { body } from "express-validator";

export const postValidator = () => [
    body('body').optional().isLength({ min: 8, max: 3200 })
        .withMessage("Post body should be at least 8 characters long"),
        
    body('title', 'Title should be at least 3 character long string').optional().isLength({ min: 3, max: 500 })
]