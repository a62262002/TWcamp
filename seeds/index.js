const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const campground = require('../models/campground');

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

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await campground.deleteMany({});
	for (let i = 0; i < 19; i++) {
		const random19 = Math.floor(Math.random() * 19);
		const camp = new campground({
			location: `${cities[random19].town}, ${cities[random19].city}`,
			title: `${sample(descriptors)} ${sample(places)}`
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
