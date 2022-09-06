const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

const genreRoutes = require('./routes/genre.routes')
const customerRoutes = require('./routes/customer.routes')
const rentalRoutes = require('./routes/rental.routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log('Mongodb error'))

app.use('/api/genres', genreRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/rentals', rentalRoutes)

app.get('/', (req, res) => {
    res.send('Hello world')
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on port: ${port}`))