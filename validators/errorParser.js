import { validationResult } from "express-validator"

export const parseError = (req, res, next) => {
    const result = validationResult(req)
    if (result.isEmpty()) {
        next()
    } else {
        res.status(400).json({ errors: result.array() })
    }
}
