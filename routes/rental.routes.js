const express = require('express')
const mongoose = require('mongoose')
const {Customer} = require("../models/customer.model");
const { Movie, validateMovie} = require('../models/movie.model')
const { Rental, validateRental } = require('../models/rental.model')
const {raw} = require("express");
const router = express.Router()

router.get('/', async (req, res) => {
	const rentals = await Rental.find().sort('-dateOut')
	res.status(200).json({
		message: 'All movie rentals retrieved',
		rentals
	})
})
router.post('/', async (req, res) => {
	const { error } = validateRental(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const customer = await Customer.find(req.body.customerId)
	if (!customer) return res.status(400).send('This customer does not exist')

	const movie = await Movie.find(req.body.movieId)
	if (!movie) return res.status(400).send('This movie does not exist')

	if (movie.numberInStock === 0) return res.status(404).send('This movie is not in stock')

	let rental = new Rental({
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone
		},
		movie: {
			_id: movie._id,
			title: movie.title,
			dailyRentalRate: movie.dailyRentalRate
		}
	})
	rental = await rental.save()

	movie.numberInStock--
	movie.save()

	res.status(201).json({
		message: 'Rental created',
		rental
	})

})
module.exports = router