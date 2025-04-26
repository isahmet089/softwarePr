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
            console.log("Bus results:", results);
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
}

module.exports = BusStrategy;
