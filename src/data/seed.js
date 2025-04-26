const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
// Modelleri çağır
const Bus = require('../model/Bus');
const Plain = require('../model/Plain');
const Train = require('../model/Train');

const mongoURI = process.env.MONGO_URI; // MongoDB bağlantı URI'si
// MongoDB bağlantı URI


async function seedDatabase() {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/project");
    console.log(`Mongo db bağlantısı başarılı  ${conn.connection.host}`);

    // Eski verileri temizle
   // await Bus.deleteMany();
   // await Plain.deleteMany();
   // await Train.deleteMany();
   //console.log('✅ Eski veriler temizlendi.');

    // JSON dosyalarını oku
    const busData = JSON.parse(fs.readFileSync(path.join(__dirname, 'bus.json'), 'utf-8'));
    const planeData = JSON.parse(fs.readFileSync(path.join(__dirname, 'plain.json'), 'utf-8'));
    const trainData = JSON.parse(fs.readFileSync(path.join(__dirname, 'train.json'), 'utf-8'));

    // Verileri ekle
    await Bus.insertMany(busData);
    console.log('✅ Bus verileri eklendi.');

    await Plain.insertMany(planeData);
    console.log('✅ Plane verileri eklendi.');

    await Train.insertMany(trainData);
    console.log('✅ Train verileri eklendi.');

    await mongoose.disconnect();
    console.log('✅ MongoDB bağlantısı kapatıldı.');
    process.exit(0);

  } catch (error) {
    console.error('❌ Seed işlemi sırasında hata oluştu:', error);
    process.exit(1);
  }
}

seedDatabase();
