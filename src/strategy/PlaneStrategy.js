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

module.exports = PlaneStrategy; 