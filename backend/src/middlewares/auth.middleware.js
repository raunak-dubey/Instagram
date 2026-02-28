import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    const token = req.cookies?.Token

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required. Token not found'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        })
    }
}