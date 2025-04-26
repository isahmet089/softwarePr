const express = require('express');
const router = express.Router();
const voyageController = require('../controllers/voyageController'); // Controlleri içe aktar
const Bus = require('../model/Bus'); // Mongoose modelini içe aktar
const Plain = require('../model/Plain'); // Mongoose modelini içe aktar
const Train = require('../model/Train'); // Mongoose modelini içe aktar


router.post('/search',voyageController.getVoyageDetails);



router.post('/add-bus', async (req, res) => {
    try {
      // req.body'deki veriyi Mongoose modeli ile yeni bir belgeye dönüştür
      const newBusTicket = new Bus(req.body);
  
      // Belgeyi veritabanına kaydet
      const savedBusTicket = await newBusTicket.save();
  
      // Başarılı yanıt gönder
      res.status(201).json(savedBusTicket); // 201 Created status kodu ve kaydedilen belge
  
    } catch (err) {
      // Hata durumunda yanıt gönder
      console.error(err); // Sunucu konsoluna hatayı yazdır
      res.status(400).json({ message: 'Otobüs bileti oluşturulurken hata oluştu', error: err.message }); // 400 Bad Request status kodu ve hata mesajı
    }
  });
router.post('/add-plain', async (req, res) => {
    try {
      // req.body'deki veriyi Mongoose modeli ile yeni bir belgeye dönüştür
      const newPlainTicket = new Plain(req.body);
  
      // Belgeyi veritabanına kaydet
      const savedPlainTicket = await newPlainTicket.save();
  
      // Başarılı yanıt gönder
      res.status(201).json(savedPlainTicket); // 201 Created status kodu ve kaydedilen belge
  
    } catch (err) {
      // Hata durumunda yanıt gönder
      console.error(err); // Sunucu konsoluna hatayı yazdır
      res.status(400).json({ message: 'Otobüs bileti oluşturulurken hata oluştu', error: err.message }); // 400 Bad Request status kodu ve hata mesajı
    }
  });
router.post('/add-train', async (req, res) => {
    try {
      // req.body'deki veriyi Mongoose modeli ile yeni bir belgeye dönüştür
      const newTrainTicket = new Train(req.body);
  
      // Belgeyi veritabanına kaydet
      const savedTrainTicket = await newTrainTicket.save();
  
      // Başarılı yanıt gönder
      res.status(201).json(savedTrainTicket); // 201 Created status kodu ve kaydedilen belge
  
    } catch (err) {
      // Hata durumunda yanıt gönder
      console.error(err); // Sunucu konsoluna hatayı yazdır
      res.status(400).json({ message: 'tren bileti oluşturulurken hata oluştu', error: err.message }); // 400 Bad Request status kodu ve hata mesajı
    }
  });

module.exports = router;