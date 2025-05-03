const TransportStrategy = require('./TransportStrategy');
const Train = require('../model/Train'); // Mongoose modelini içe aktar


class TrainStrategy extends TransportStrategy {
    async calculateDetails(from, to, date) {
      console.log("TrainStrategy calculateDetails method called");
      const searchDate = new Date(date);

        try {
            const results = await Train.find({
                from,
                to,
                date: searchDate
            });
            
            if (results.length === 0) {
                return null;
            } else {
                return results;
            }
        } catch (error) {
            console.error("Error fetching bus data:", error);
            throw error;
        }
    }
    async getTicketById(id) {
        return await Train.findById(id);
    }
    async priceDetails(id) {
        console.log("BusStrategy priceDetails method called");
       
        const ticket = await Train.findById(id);
        if (!ticket) {
            throw new Error("Bilet bulunamadı");
        }

        return {
           kdv : 0.10,
           hizmetBedeli : 120,
            toplamFiyat : ticket.price + (ticket.price * 0.10) + 120,
        };

        
    }
    async getDiscount(userType) {
        
        console.log("BusStrategy getDiscount method called");
        let discount = 0;
        switch (userType) {
            case 'yetiskin':
                discount = 0; // %10 indirim
                break;
            case 'ogrenci':
                discount = 0.12; // %20 indirim
                break;
            case 'ozel':
                discount = 0.22; // %30 indirim
                break;
            case 'yasli':
                discount = 0.18; // %40 indirim
                break;
            default:
                discount = 0; // %0 indirim
        }
        return discount;
    }
}

module.exports = TrainStrategy; 