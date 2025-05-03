const BusStrategy = require('../strategy/BusStrategy');
const PlaneStrategy = require('../strategy/PlaneStrategy');
const TrainStrategy = require('../strategy/TrainStrategy');
const Bus = require('../model/Bus'); // Mongoose modelini içe aktar
const Plain = require('../model/Plain'); // Mongoose modelini içe aktar
const Train = require('../model/Train'); // Mongoose modelini içe aktar

const getVoyageDetails = async (req, res) => {
    const { from, to, date, type } = req.body;
    let strategy;

    try {
        if (type === 'bus') {
            strategy = new BusStrategy();
        } else if (type === 'plane') {
            strategy = new PlaneStrategy();
        } else if (type === 'train') {
            strategy = new TrainStrategy();
        } else {
            return res.status(400).json({ message: 'Tip Seçin' });
        }   

        const results = await strategy.calculateDetails(from, to, date);
        if (!results || results.length === 0) {
            console.log("Veri yok");
            return res.render('home', { results: null });

        }
        res.render('home', {results: results});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'server hata' });
    }
};


const deneme = async (req, res) => {
    const { from, to, date, type } = req.body;
    if (!from || !to || !date || !type) {
        return res.status(400).json({ message: 'Eksik parametreler' });
    }
    try {
        if (type === 'bus') {
            const busResults = await Bus.find({ from, to, date });
            if (busResults.length === 0) {
                return res.status(404).json({ message: 'Otobüs bileti bulunamadı' });
            }
            res.status(200).json(busResults);
        } else if (type === 'plane') {
            const planeResults = await Plain.find({ from, to, date });
            if (planeResults.length === 0) {
                return res.status(404).json({ message: 'Uçak bileti bulunamadı' });
            }
            res.status(200).json(planeResults);
        } else if (type === 'train') {
            const trainResults = await Train.find({ from, to, date });
            if (trainResults.length === 0) {
                return res.status(404).json({ message: 'Tren bileti bulunamadı' });
            }
            res.status(200).json(trainResults);
        }
        else {
            return res.status(400).json({ message: 'Geçersiz tip' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};
const deneme2 = async (req, res) => {
    const { from, to, date, type } = req.body;

    // Parametre doğrulama
    if (!from || !to || !date || !type) {
        return res.status(400).json({ 
            success: false,
            message: 'Eksik parametreler. Lütfen "from", "to", "date" ve "type" alanlarını doldurun.'
        });
    }

    let Model;
    let notFoundMessage;

    // Ulaşım tipi belirleme
    switch (type.toLowerCase()) {
        case 'bus':
            Model = Bus;
            notFoundMessage = 'Belirtilen kriterlere uygun otobüs bileti bulunamadı.';
            break;
        case 'plane':
            Model = Plain;
            notFoundMessage = 'Belirtilen kriterlere uygun uçak bileti bulunamadı.';
            break;
        case 'train':
            Model = Train;
            notFoundMessage = 'Belirtilen kriterlere uygun tren bileti bulunamadı.';
            break;
        default:
            return res.status(400).json({ 
                success: false,
                message: 'Geçersiz ulaşım tipi seçildi. Lütfen "bus", "plane" veya "train" seçeneklerinden birini kullanın.'
            });
    }

    try {
        // Veritabanı sorgusu
        const results = await Model.find({ from, to, date });

        if (!results || results.length === 0) {
            return res.status(404).json({ 
                success: false,
                message: notFoundMessage 
            });
        }

        // Başarılı yanıt
        return res.status(200).json({ 
            success: true,
            count: results.length,
            data: results,
            message: `${results.length} adet sonuç bulundu.`
        });

    } catch (error) {
        console.error('Veri çekme sırasında hata oluştu:', error);

        return res.status(500).json({ 
            success: false,
            message: 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyiniz.'
        });
    }
};


module.exports = {
    getVoyageDetails
};
