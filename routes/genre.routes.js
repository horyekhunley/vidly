const express = require('express')
const { Genre, validateGenre } = require('../models/genre.model')
const router = express.Router()

router.get('/', async (req, res) => {
	const genre = await Genre.find().sort('name')
	res.status(200).json({
		message: 'All genre retrieved',
		genre
	})
})
router.post('/', async (req, res) => {
	const { error } = validateGenre(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	let genre = new Genre({
		name: req.body.name
	})
	genre = await genre.save()

	res.status(201).json({
		message: 'Genre created',
		genre
	})})
router.put('/:id', async (req, res) => {
	const { error } = validateGenre(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
		new: true
	})
	if(!genre) return res.status(404).send('The genre with this id was not found')

	res.status(200).json({
		message: 'Genre updated',
		genre
	})
})
router.delete('/:id', async (req, res) => {
	const genre = await Genre.findByIdAndRemove(req.params.id)
	if(!genre) return res.status(404).send('The genre with this id was not found')

	res.status(200).json({
		message: 'Genre deleted',
		genre
	})
})
router.get('/:id', async (req, res) => {
	const genre = await Genre.findById(req.params.id)
	if(!genre) return res.status(404).send('The genre with this id was not found')

	res.status(200).json({
		message: 'Genre retrieved',
		genre
	})

})
module.exports = router