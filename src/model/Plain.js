const mongoose = require('mongoose');

// JSON yapınıza göre bir Schema tanımlama
const PlainSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true, // Kalkış yeri zorunlu
    trim: true // Baştaki ve sondaki boşlukları temizler
  },
  to: {
    type: String,
    required: true, // Varış yeri zorunlu
    trim: true
  },
  type: {
    type: String,
    required: true, // Taşıma türü zorunlu (Burada 'Otobüs')
    enum: ['Uçak' ], // Belirli değerlerle kısıtlayabilirsiniz
    trim: true
  },
  price: {
    type: Number,
    required: true, // Fiyat zorunlu
    min: 0 // Fiyat negatif olamaz
  },
  departure_time: {
    type: String, // Saat formatı (HH:mm) string olarak saklanabilir
    required: true, // Kalkış saati zorunlu
    trim: true
  },
  arrival_time: {
    type: String, // Saat formatı (HH:mm) string olarak saklanabilir
    required: true, // Varış saati zorunlu
    trim: true
  },
  duration: {
    type: String, // Süre formatı (Xs Yd) string olarak saklanabilir
    required: true, // Süre zorunlu
    trim: true
  },
  company: {
    type: String,
    required: true, // Firma adı zorunlu
    trim: true
  },
  departure_station: {
    type: String,
    required: true, // Kalkış istasyonu zorunlu
    trim: true
  },
  arrival_station: {
    type: String,
    required: true, // Varış istasyonu zorunlu
    trim: true
  },
  date: {
    type: Date,
    required: true 
   
  }
}, {
  timestamps: true 
});


const Plain = mongoose.model('Plain', PlainSchema);

module.exports = Plain;