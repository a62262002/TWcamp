# Taiwan Camp
A campgrounds website in Taiwan, people can see campgrounds in Taiwan.

## Features

### Authentication & Authorize

* User can login, register account.
* Only author of the campgrounds can edit and delete the campgrounds.
* Only author of the reviews can delete the reviews.

### Campground function

* User can see the homepage of the campground.
* User can see the information of campgrounds in the main page, and see the map of Taiwan camp.
* User can see the show page of campground and see the name, price, description an map of campground.
* If the user have already register the account, user can make a new campground.
* If the user have already register the account, user can leave a new review of the campground.

## Live Demo

Go to the live demo : [Taiwan Camp](https://pacific-taiga-81202.herokuapp.com/)

## Getting Started

### Prerequisites

* [npm](https://www.npmjs.com/get-npm)
* [Node.js](https://nodejs.org/en/download/)
* [MongoDB](https://www.mongodb.com/)

### Installing

#### Clone 

**Clone this repository to your local machine**

```
git clone https://github.com/a62262002/TWcamp.git
```

### Setup

1. Install npm packages
```
npm install
```
2. Create .env file
```
touch .env
```
3. Store API key in .env file and save
```
CLOUDINARY_CLOUD_NAME=<Your CLOUDINARY_CLOUD_NAME>
CLOUDINARY_KEY=<Your CLOUDINARY_KEY>
CLOUDINARY_SECRET=<Your CLOUDINARY_SECRET>
MAPBOX_TOKEN=<Your MAPBOX_TOKEN>
```
3. Create seeds in database
```
node seeds/index.js
```
4. Run the server
```
nodemon app.js
```
5. Success activation if you see the messages below
```
Serving on port 3000
```
6. You can see the Taiwan Camp on: [http://localhost:3000](http://localhost:3000)

### Test account information

| Username  | Password | 
|-----------|----------|
| Roger     | roger    | 
| Tony      | tony     |

### Author

* **Emily** - [a62262002](https://github.com/a62262002)