const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String },
  height: { type: Number }, 
  weight: { type: Number }  
});

module.exports = mongoose.model('Patient', patientSchema);
