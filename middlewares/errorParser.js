
export const parseError = (req, res, next) => {
    const result = validationResult(req)
    if (result.isEmpty()) {
        next()
    } else {
        res.status(400).json({ error: result.array() })
    }

}
