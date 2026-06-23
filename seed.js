require('dotenv').config()
const mongoose = require('mongoose')
const MenuItem = require('./models/MenuItem')

const items = [
  { name: 'Margherita Pizza',  category: 'pizza',   price: 18, description: 'Classic pizza with tomato, mozzarella, and fresh basil.',      image: '/images/margherita-pizza.jpg' },
  { name: 'Quattro Stagioni',  category: 'pizza',   price: 22, description: 'Pizza with mushrooms, artichokes, ham, and olives.',            image: '/images/quattro-stagioni.jpg' },
  { name: 'Swiss Rösti',       category: 'swiss',   price: 15, description: 'Crispy potato pancake served with cheese and herbs.',           image: '/images/swiss-rosti.jpg' },
  { name: 'Cheese Fondue',     category: 'swiss',   price: 28, description: 'Traditional Swiss cheese fondue with bread cubes.',             image: '/images/cheese-fondue.jpg' },
  { name: 'Tiramisu',          category: 'dessert', price: 12, description: 'Italian dessert with coffee, mascarpone, and cocoa.',           image: '/images/tiramisu.jpg' },
  { name: 'Chocolate Fondue',  category: 'dessert', price: 14, description: 'Warm chocolate fondue with fresh fruit and marshmallows.',      image: '/images/chocolate-fondue.jpg' },
]

mongoose.connect(process.env.MONGO_URI)
  .then(async function() {
    console.log('Connected to MongoDB')
    await MenuItem.deleteMany({})
    await MenuItem.insertMany(items)
    console.log('Database seeded with', items.length, 'menu items')
    mongoose.disconnect()
  })
  .catch(function(err) {
    console.error('Error:', err.message)
    process.exit(1)
  })
