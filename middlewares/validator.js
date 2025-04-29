const validator = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).send('Access Denied: Admins only.');
    }
    next();
};

module.exports = validator;
