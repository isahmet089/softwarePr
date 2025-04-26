const BusStrategy = require('../strategy/BusStrategy');
const PlaneStrategy = require('../strategy/PlaneStrategy');
const TrainStrategy = require('../strategy/TrainStrategy');

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
            return res.status(400).json({ message: 'Invalid transport type' });
        }

        const results = await strategy.calculateDetails(from, to, date);
        if (!results || results.length === 0) {
            console.log("No results found for the given criteria.");
            return res.render('home', { results: null });

        }
        console.log("Voyage results:", results);
        res.render('home', {results: results});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getVoyageDetails
};
