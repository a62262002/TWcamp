const express = require('express');
const router = express.Router();

const { campgroundSchema } = require('../schemas');
const { isLoggedIn } = require('../middleware');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Campground = require('../models/campground');

const validateCampground = (req, res, next) => {
	const { error } = campgroundSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

router.get(
	'/',
	catchAsync(async (req, res) => {
		const campgrounds = await Campground.find({});
		res.render('twcampgrounds/index', { campgrounds });
	})
);

router.get('/new', isLoggedIn, (req, res) => {
	res.render('twcampgrounds/new');
});

router.post(
	'/',
	isLoggedIn,
	validateCampground,
	catchAsync(async (req, res) => {
		// if (!req.body.campgrounds) throw new ExpressError('Invalid Data', 400);
		const campground = new Campground(req.body.campground);
		await campground.save();
		req.flash('success', 'Successfully made a new campground!');
		res.redirect(`/twcampgrounds/${campground._id}`);
	})
);

router.get(
	'/:id',
	catchAsync(async (req, res) => {
		const campground = await Campground.findById(req.params.id).populate('reviews');
		if (!campground) {
			req.flash('error', 'Cannot find that campground!');
			return res.redirect('/twcampgrounds');
		}
		res.render('twcampgrounds/show', { campground });
	})
);

router.get(
	'/:id/edit',
	isLoggedIn,
	catchAsync(async (req, res) => {
		const campground = await Campground.findById(req.params.id);
		if (!campground) {
			req.flash('error', 'Cannot find that campground!');
			return res.redirect('/twcampgrounds');
		}
		res.render('twcampgrounds/edit', { campground });
	})
);

router.put(
	'/:id',
	isLoggedIn,
	validateCampground,
	catchAsync(async (req, res) => {
		const { id } = req.params;
		const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
		req.flash('success', 'Successfully updated campground!');
		res.redirect(`/twcampgrounds/${campground._id}`);
	})
);

router.delete(
	'/:id',
	isLoggedIn,
	catchAsync(async (req, res) => {
		const { id } = req.params;
		await Campground.findByIdAndDelete(id);
		req.flash('success', 'Successfully deleted campground');
		res.redirect('/twcampgrounds');
	})
);

module.exports = router;
