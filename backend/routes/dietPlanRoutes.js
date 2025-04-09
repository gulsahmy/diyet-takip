const express = require('express');
const router = express.Router();
const DietPlan = require('../models/DietPlan');

// Tüm diyet planlarını getir
router.get('/', async (req, res) => {
  try {
    const diets = await DietPlan.find().sort({ createdAt: -1 });
    res.json(diets);
  } catch (err) {
    res.status(500).json({ error: 'Diyet listeleri alınamadı' });
  }
});

// Yeni diyet planı ekle
router.post('/', async (req, res) => {
  try {
    const newDiet = new DietPlan(req.body);
    await newDiet.save();
    res.status(201).json(newDiet);
  } catch (err) {
    res.status(500).json({ error: 'Diyet planı eklenemedi' });
  }
});

// Diyet planı sil
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await DietPlan.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Plan bulunamadı' });
    res.json({ message: 'Plan silindi' });
  } catch (err) {
    res.status(500).json({ error: 'Plan silinemedi' });
  }
});

module.exports = router;
