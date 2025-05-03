class TransportStrategy {
  
    calculateDetails(from, to, date) {
        throw new Error('calculateDetails method must be implemented');
    }
     getTicketById(id) {
        throw new Error("getTicketById methodu override edilmelidir");
    }
    priceDetails(id) {
        throw new Error('price method must be implemented');
    }
    getDiscount(userType) {
        throw new Error('getDiscount method must be implemented');
    }

}

module.exports = TransportStrategy; 