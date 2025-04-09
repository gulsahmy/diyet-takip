const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },     // hasta adı (basit versiyon)
  date: { type: Date, required: true },              // randevu tarihi
  note: { type: String }                             // açıklama, isteğe bağlı
}, { timestamps: true }); // createdAt, updatedAt otomatik oluşur

module.exports = mongoose.model('Appointment', appointmentSchema);
