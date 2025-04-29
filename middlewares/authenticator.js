const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticator = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).send('No token, Authorization denied.');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token.');
        req.user = decoded;
        next();
    });
};

module.exports = authenticator;
