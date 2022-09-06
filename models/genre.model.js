const mongoose = require('mongoose')
const Joi = require('joi')

const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 5,
		maxLength: 50
	}
})
const Genre = new mongoose.model('Genre', genreSchema)

const validateGenre = (genre) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(50).required(),
	})
	return schema.validate(genre);
};
module.exports = {
	Genre,
	validateGenre
}