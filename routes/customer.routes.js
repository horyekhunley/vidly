const express = require('express')
const { Customer, validateCustomer } = require('../models/customer.model')
const router = express.Router()

router.get('/', async (req, res) => {
	const customers = await Customer.find().sort('name')
	res.status(200).json({
		message: 'All customers retrieved',
		customers
	})
})
router.post('/', async (req, res) => {
	const { error } = validateCustomer(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	let customer = new Customer({
		name: req.body.name,
		isGold: req.body.isGold,
		phone: req.body.phone
	})
	customer = await customer.save()

	res.status(201).json({
		message: 'Customer created',
		customer
	})})
router.put('/:id', async (req, res) => {
	const { error } = validateCustomer(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
		new: true
	})
	if(!customer) return res.status(404).send('The customer with this id was not found')

	res.status(200).json({
		message: 'Customer updated',
		customer
	})
})
router.delete('/:id', async (req, res) => {
	const customer = await Customer.findByIdAndRemove(req.params.id)
	if(!customer) return res.status(404).send('The customer with this id was not found')

	res.status(200).json({
		message: 'customer deleted',
		customer
	})
})
router.get('/:id', async (req, res) => {
	const customer = await Customer.findById(req.params.id)
	if(!customer) return res.status(404).send('The customer with this id was not found')

	res.status(200).json({
		message: 'customer retrieved',
		customer
	})

})
module.exports = router