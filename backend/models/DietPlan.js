const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema({
  title: { type: String, required: true },         // Örn: "1600 kalorilik diyet"
  description: { type: String },                   // İsteğe bağlı: açıklama
  createdAt: { type: Date, default: Date.now }     // Otomatik tarih
});

module.exports = mongoose.model('DietPlan', dietPlanSchema);
