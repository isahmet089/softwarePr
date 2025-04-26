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

module.exports = TrainStrategy; 