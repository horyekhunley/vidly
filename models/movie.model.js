const mongoose = require('mongoose')
const Joi = require('joi')
const { Genre } = require('./genre.model')

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minLength: 5,
		maxLength: 50
	},
	genre: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Genre,
		required: true
	},
	numberInStock: {
		type: Number,
		required: true,
		min: 0,
		max: 255,
	},
	dailyRentalRate: {
		type: Number,
		required: true,
		min: 0,
		max: 255,
	}
})
const Movie = new mongoose.model('Movie', movieSchema)

const validateMovie = (movie) => {
	const schema = Joi.object({
		title: Joi.string().min(5).max(50).required(),
		genreId: Joi.string().required(),
		numberInStock: Joi.number().min(0).required(),
		dailyRentalRate: Joi.number().min(0).required()
	})
	return schema.validate(movie)
}
module.exports = {
	Movie,
	validateMovie
}