const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Randevuları getir (filtreli veya hepsi)
router.get("/", async (req, res) => {
  const { patientName } = req.query;

  try {
    const query = {};
    if (patientName) {
      query.patientName = patientName;
    }

    const appointments = await Appointment.find(query).sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Randevular getirilemedi" });
  }
});


// Randevu güncelle
router.put("/:id", async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ error: "Randevu bulunamadı" });
    }
    res.json(updatedAppointment);
  } catch (err) {
    res.status(500).json({ error: "Randevu güncellenemedi" });
  }
});

// Randevu sil
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Randevu bulunamadı" });
    res.json({ message: "Randevu silindi" });
  } catch (err) {
    res.status(500).json({ error: "Randevu silinemedi" });
  }
});

// Belirli hastaya ait randevuları getir
router.get("/", async (req, res) => {
  const { patientName } = req.query;

  try {
    let query = {};
    if (patientName) {
      query.patientName = patientName;
    }

    const appointments = await Appointment.find(query).sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Randevular getirilemedi" });
  }
});

module.exports = router;
