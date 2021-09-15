const onlyAdmin = (req, res, next) => {
	if (req.session.user) {
		const user = req.session.user;
		if (!user.admin) {
			return res.redirect('/pages/books');
		}
	} else {
		return res.redirect('/pages/books');
	}
	next();
};



module.exports = {
	onlyAdmin,
	
};
