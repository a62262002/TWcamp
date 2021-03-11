const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/tw-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
	res.render('home');
});

app.get(
	'/twcampgrounds',
	catchAsync(async (req, res) => {
		const campgrounds = await Campground.find({});
		res.render('twcampgrounds/index', { campgrounds });
	})
);

app.get('/twcampgrounds/new', (req, res) => {
	res.render('twcampgrounds/new');
});

app.post(
	'/twcampgrounds',
	catchAsync(async (req, res) => {
		if (!req.body.campgrounds) throw new ExpressError('Invalid Data', 400);
		const campground = new Campground(req.body.campground);
		await campground.save();
		res.redirect(`/twcampgrounds/${campground._id}`);
	})
);

app.get(
	'/twcampgrounds/:id/edit',
	catchAsync(async (req, res) => {
		const campground = await Campground.findById(req.params.id);
		res.render('twcampgrounds/edit', { campground });
	})
);

app.get(
	'/twcampgrounds/:id',
	catchAsync(async (req, res) => {
		const campground = await Campground.findById(req.params.id);
		res.render('twcampgrounds/show', { campground });
	})
);

app.put(
	'/twcampgrounds/:id',
	catchAsync(async (req, res) => {
		const { id } = req.params;
		const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
		res.redirect(`/twcampgrounds/${campground._id}`);
	})
);

app.delete(
	'/twcampgrounds/:id',
	catchAsync(async (req, res) => {
		const { id } = req.params;
		await Campground.findByIdAndDelete(id);
		res.redirect('/twcampgrounds');
	})
);

app.all('*', (req, res, next) => {
	next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = 'Oh No, Something Went Wrong!';
	res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
	console.log('Serving on port 3000');
});
