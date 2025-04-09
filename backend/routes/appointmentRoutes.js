const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Tüm randevuları getir
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Randevular getirilemedi' });
  }
});

// Yeni randevu ekle
router.post('/', async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ error: 'Randevu eklenemedi' });
  }
});

// Randevu güncelle
router.put('/:id', async (req, res) => {
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedAppointment) {
        return res.status(404).json({ error: 'Randevu bulunamadı' });
      }
      res.json(updatedAppointment);
    } catch (err) {
      res.status(500).json({ error: 'Randevu güncellenemedi' });
    }
  });
  

// Randevu sil
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Randevu bulunamadı' });
    res.json({ message: 'Randevu silindi' });
  } catch (err) {
    res.status(500).json({ error: 'Randevu silinemedi' });
  }
});

module.exports = router;
