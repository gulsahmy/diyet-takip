const Appointment = require('../models/Appointment');

// Randevu oluştur
exports.createAppointment = async (req, res) => {
  const { patientName, date, note } = req.body;

  try {
    const appointment = new Appointment({ patientName, date, note });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Randevu oluşturulamadı', error: error.message });
  }
};

// Randevuları listele
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Randevular getirilemedi', error: error.message });
  }
};
