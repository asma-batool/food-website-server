const mongoose = require('mongoose')

// Schema = the shape/rules for one menu item in the database
const menuItemSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  category:    { type: String, required: true },
  price:       { type: Number, required: true },
  description: { type: String },
  image:       { type: String },
})

// Model = the tool we use to read/write MenuItem documents
module.exports = mongoose.model('MenuItem', menuItemSchema)
