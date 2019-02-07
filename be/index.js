#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
const db = mongoose.connect('mongodb://localhost/likes', { useNewUrlParser: true }); // likes as name of the DB
const musicRouter = express.Router();

const port = process.env.PORT || 3000;
const Like = require('./models/likeModel');
const Track = require('./models/trackModel');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

musicRouter.route('/likes')
	.post((req, res) => {
		const like = new Like(req.body);
		like.save();
		return res.status(201).json(like);
	})
	.get((req, res) => {
		Track.aggregate([{ $sample: { size: 2 } }]).exec().then((err, tracks) => {
			if (err) {
				return res.send(err);
			}
			return res.json(tracks);
		});
	});

app.use('/api', musicRouter);

app.get('/', (req, res) => {
	res.send('Welcome to my API!');
});

app.listen(port, () => {
});
