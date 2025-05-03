const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  userType: {
    type: String,
    enum: ['yetiskin', 'ogrenci', 'ozel', 'yasli'],
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  acceptedTerms: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
