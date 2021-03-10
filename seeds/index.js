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
				'Sed laoreet iaculis sapien, ut hendrerit massa fringilla quis. Aenean tellus ligula, faucibus posuere velit vitae, vulputate malesuada lorem. Praesent nec lorem nec ipsum porttitor facilisis. Vivamus mattis fringilla ligula in pharetra. Phasellus efficitur eros non aliquet porttitor. Maecenas quis lorem et massa dignissim ultrices. Vivamus malesuada ex quis scelerisque fermentum. Nunc dignissim vulputate neque, sit amet finibus nunc hendrerit sit amet.',
			price
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
