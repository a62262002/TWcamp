const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
	res.render('users/register');
});

router.post(
	'/register',
	catchAsync(async (req, res) => {
		try {
			const { email, username, password } = req.body;
			const user = new User({ email, username });
			const registerdUser = await User.register(user, password);
			req.login(registerdUser, (err) => {
				if (err) return next(err);
				req.flash('success', 'Welcome to TW Camp!');
				res.redirect('/twcampgrounds');
			});
		} catch (e) {
			req.flash('error', e.message);
			res.redirect('register');
		}
	})
);

router.get('/login', (req, res) => {
	res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
	req.flash('success', 'welcome back');
	const redirectUrl = req.session.returnTo || '/twcampgrounds';
	delete req.session.returnTo;
	res.redirect(redirectUrl);
});

router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'Goodbye!');
	res.redirect('/twcampgrounds');
});

module.exports = router;
