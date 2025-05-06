class TransportStrategy {
  
    calculateDetails(from, to, date) {
        throw new Error('calculateDetails methodu override edilmelidir');
    }
     getTicketById(id) {
        throw new Error("getTicketById methodu override edilmelidir");
    }
    priceDetails(id) {
        throw new Error('price methodu override edilmelidir');
    }
    getDiscount(userType) {
        throw new Error('getDiscount methodu override edilmelidir');
    }

}

module.exports = TransportStrategy; 