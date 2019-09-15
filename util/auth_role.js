

module.exports = function (roles) {
	return function (req, res, next) {
		// roles param can be a single role string ('user') 
		// or an array of roles (['user', 'mgr'])
		if (typeof roles === 'string') {
			roles = [roles];
		}

		// user's role must match authorized roles, or be 'admin'
		if (roles.length && !roles.includes(req.jwt.role) && req.jwt.role !== 'admin') {
			// user's role is not authorized
			return res.status(401).json({ message: 'Unauthorized' });
		}

		next()
	}
}