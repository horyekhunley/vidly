const express = require('express')
const {Customer, validateCustomer} = require("../models/customer.model");
const { Movie, validateMovie } = require('../models/movie.model')
const router = express.Router()

router.get('/', async (req, res) => {
	const movies = await Movie.find().sort('title')
	res.status(200).json({
		message: 'All movies retrieved',
		movies
	})
})
router.post('/', async (req, res) => {
	const { error } = validateMovie(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const genre = await Movie.findById(req.body.genreId)
	if (!genre) return res.status(400).send('This movie does not exist')

	let movie = new Movie({
		title: req.body.title,
		genre: {
			_id: genre._id,
			name: genre.name
		},
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate
	})
	movie = await movie.save()

	res.status(201).json({
		message: 'Movie created',
		movie
	})
})