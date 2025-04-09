const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const patientRoutes = require('./routes/patientRoutes');
const dietPlanRoutes = require('./routes/dietPlanRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');



dotenv.config();

const app = express(); 

app.use(cors());
app.use(express.json());


app.use('/api/patients', patientRoutes);
app.use('/api/diet-plans', dietPlanRoutes);
app.use('/api/appointments', appointmentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB bağlantısı başarılı');
    app.listen(process.env.PORT, () => {
      console.log(`Sunucu ${process.env.PORT} portunda çalışıyor`);
    });
  })
  .catch((err) => {
    console.error('MongoDB bağlantı hatası:', err);
  });
