const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {  // protect middleware
    let token

    // check for token in headers
    if (
        req.headers.authorization && // check if authorization header exists
        req.headers.authorization.startsWith('Bearer ') // ✅ space after Bearer
    ) {
        token = req.headers.authorization.split(' ')[1] // get token part after 'Bearer'
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // verify token
        req.user = decoded // attach decoded user info to req object
        next() // proceed to next middleware/controller
    } catch (error) {
        res.status(401).json({ message: 'Token invalid or expired' })
    }
}

module.exports = protect