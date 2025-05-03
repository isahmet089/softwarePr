const TransportStrategy = require('./TransportStrategy');
const Plain = require('../model/Plain'); // Mongoose modelini içe aktar

class PlaneStrategy extends TransportStrategy {


async calculateDetails(from, to, date) {
       console.log("PlaneStrategy calculateDetails method called");
       const searchDate = new Date(date);

       try {
           const results = await Plain.find({
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
    return await Plain.findById(id);
}
async priceDetails(id) {
    console.log("BusStrategy priceDetails method called");
   
    const ticket = await Plain.findById(id);
    if (!ticket) {
        throw new Error("Bilet bulunamadı");
    }

    return {
       kdv : 0.25,
       hizmetBedeli : 200,
        toplamFiyat : ticket.price + (ticket.price * 0.25) + 200,
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
            discount = 0.1; // %20 indirim
            break;
        case 'ozel':
            discount = 0.20; // %30 indirim
            break;
        case 'yasli':
            discount = 0.15; // %40 indirim
            break;
        default:
            discount = 0; // %0 indirim
    }
    return discount;
}
   
}

module.exports = PlaneStrategy; 