try { require('dotenv').config() } catch(e) {}
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const MenuItem = require('./models/MenuItem')
const authRoutes = require('./routes/auth')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(function() { console.log('Connected to MongoDB') })
  .catch(function(err) { console.error('MongoDB connection error:', err.message) })

app.get('/', function(req, res) { res.json({ status: 'ok' }) })

app.use('/api/auth', authRoutes)

// GET /api/menu — fetch all items from the database
app.get('/api/menu', async function(req, res) {
  var items = await MenuItem.find()
  res.json(items)
})

// GET /api/menu/:category — filter by category
app.get('/api/menu/:category', async function(req, res) {
  var items = await MenuItem.find({ category: req.params.category })
  res.json(items)
})

app.listen(PORT, function() {
  console.log('AISU server running at http://localhost:' + PORT)
})
