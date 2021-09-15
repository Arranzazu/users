const { Router } = require('express');
const models =  require('../api/models');
const middlewares = require('../middlewares');
const router = Router();

router.get('/sign-in', (req, res) => {

	let errorMessage;
	if (req.session.errorMessage) {
		errorMessage = req.session.errorMessage;
		delete req.session['errorMessage'];
	}

	res.render('sign_in.pug', { title: 'Sign in', errorMessage });
});

   

router.get('/sign-up', (req, res) => {
	let errorMessage;
	if (req.session.errorMessage) {
		errorMessage = req.session.errorMessage;
		delete req.session['errorMessage'];
	}
	res.render('sign_up.pug', { title: 'Sign Up', errorMessage });
});

router.get('/userlist', async (req, res) => {
	// if (req.session.counter) {
	// 	req.session.counter++;
	// } else {
	// 	req.session.counter = 1;
	// }

	// req.session.counter = req.session.counter ? req.session.counter + 1 : 1;
	// const counter = req.session.counter;

	// let userType = 0; // 0: Anonymous, 1: User, 2: Admin.
	// if (req.session.user) {
	// 	const user = req.session.user;
	// 	userType = user.admin ? 2 : 1;
	// }

	// const usuario = await models.user.find();
	const user = req.session.user;
	let userType = 0; // 0: Anonymous, 1: User, 2: Admin.
	if (req.session.user) {
		const user = req.session.user;
		userType = user.admin ? 2 : 1;
	}
	// var noadmin;
	// noadmin = await models.email.find({ admin: {$ne: true}})
	const usuarios = await models.user.find();

	res.render('userlist.pug', { title: 'Users Page', userType, usuarios, user });
});


// 	const userType = 0;

// 	res.render('userlist.pug', { title: 'Users Page', userType });
// })

// Middlewares
router.post('/create', async (req, res) => {
	const { email, password } = req.body;

	const existUser = await models.user.findOne({ email });
	if (existUser !== null) {
		req.session.errorMessage = 'Usuario ya registrado - CREATE';
		return res.redirect('/pages/sign-up');
	}

	const hash = await models.user.encrypt(password);

	const user = models.user({ email, password: hash });
	await user.save();

	res.redirect('/pages/sign-in');
});

//Funcion para logarse y redirigir a userlist
router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const user = await models.user.findOne({ email });
	if (!user) {
		req.session.errorMessage = 'El email no existe';
		return res.redirect('/pages/sign-in');
	}

	const isValid = await models.user.compare(password, user.password);
	if (!isValid) {
		req.session.errorMessage = 'Password incorrecto';
		return res.redirect('/pages/sign-in');
	}

	req.session.user = user;
	res.redirect('/pages/userlist');
});

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
		}
		res.redirect('/pages/sign-in');
	});
});


module.exports = router;
