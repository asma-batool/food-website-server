const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

// POST /api/auth/register
router.post('/register', async function(req, res) {
  var { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  var existing = await User.findOne({ email })
  if (existing) {
    return res.status(400).json({ message: 'Email already registered' })
  }

  // hash the password — 10 is the "salt rounds" (how hard the scramble is)
  var hashed = await bcrypt.hash(password, 10)

  var user = await User.create({ name, email, password: hashed })

  var token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.status(201).json({ token, name: user.name, email: user.email })
})

// POST /api/auth/login
router.post('/login', async function(req, res) {
  var { email, password } = req.body

  var user = await User.findOne({ email })
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  // compare the plain password against the stored hash
  var match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  var token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.json({ token, name: user.name, email: user.email })
})

module.exports = router
