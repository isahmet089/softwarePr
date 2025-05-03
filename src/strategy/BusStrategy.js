const TransportStrategy = require('./TransportStrategy');
const Bus = require('../model/Bus');


class BusStrategy extends TransportStrategy {
    async calculateDetails(from, to, date) {
        console.log("BusStrategy calculateDetails method called");
        console.log("from:", from, "to:", to, "date:", date);

        const searchDate = new Date(date);
        try {
            const results = await Bus.find({
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
        return await Bus.findById(id);
    }
    async priceDetails(id) {
        console.log("BusStrategy priceDetails method called");
       
        const ticket = await Bus.findById(id);
        if (!ticket) {
            throw new Error("Bilet bulunamadı");
        }

        return {
           kdv : 0.18,
           hizmetBedeli : 30,
            toplamFiyat : ticket.price + (ticket.price * 0.18) + 30,
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
                discount = 0.2; // %20 indirim
                break;
            case 'ozel':
                discount = 0.4; // %30 indirim
                break;
            case 'yasli':
                discount = 0.3; // %40 indirim
                break;
            default:
                discount = 0; // %0 indirim
        }
        return discount;
    }

    
}

module.exports = BusStrategy;
