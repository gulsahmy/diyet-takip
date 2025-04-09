const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Yeni hasta ekle
router.post('/', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    console.log('Yeni hasta eklendi:', newPatient);
    res.status(201).json(newPatient);
  } catch (err) {
    console.error('Ekleme hatası:', err);
    res.status(500).json({ error: 'Hasta eklenemedi' });
  }
});

router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();

    // Her hastaya BMI hesapla
    const patientsWithBMI = patients.map((p) => {
      const bmi = p.height && p.weight
        ? (p.weight / ((p.height / 100) ** 2)).toFixed(2)
        : null;

      return { ...p.toObject(), bmi };
    });

    res.json(patientsWithBMI);
  } catch (err) {
    res.status(500).json({ error: 'Hastalar getirilemedi' });
  }
});


// Tüm hastaları getir
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Hasta bulunamadı' });

    const bmi = patient.height && patient.weight
      ? (patient.weight / ((patient.height / 100) ** 2)).toFixed(2)
      : null;

    res.json({ ...patient.toObject(), bmi });
  } catch (err) {
    res.status(500).json({ error: 'Hasta alınamadı' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ error: 'Hasta bulunamadı' });
    }

    // ✅ BMI hesapla
    const bmi = updatedPatient.height && updatedPatient.weight
      ? (updatedPatient.weight / ((updatedPatient.height / 100) ** 2)).toFixed(2)
      : null;

    res.json({ ...updatedPatient.toObject(), bmi }); // ✅ BMI'li JSON gönder
  } catch (err) {
    res.status(500).json({ error: 'Hasta güncellenemedi' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Hasta bulunamadı' });
    res.json({ message: 'Hasta silindi' });
  } catch (err) {
    res.status(500).json({ error: 'Hasta silinemedi' });
  }
});


module.exports = router;
