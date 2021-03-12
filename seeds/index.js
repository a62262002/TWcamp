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
	for (let i = 0; i < 24; i++) {
		const random24 = Math.floor(Math.random() * 24);
		const price = Math.floor(Math.random() * 1000) + 500;
		const camp = new campground({
			location: `${cities[random24].town}, ${cities[random24].city}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			image: 'https://source.unsplash.com/collection/483251',
			description:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima quae excepturi minus ab ut omnis! Ipsa quasi adipisci laboriosam, dolor laborum, sequi, eligendi voluptas voluptatem veritatis cupiditate optio quia.',
			price
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
