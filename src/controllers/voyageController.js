const Voyage = require('../model/Voyage');

const getVoyage = (req, res) => {
    const travelData = Voyage.getAllTravels();
   res.status(200).json({
        status: 'success',
        data: {
            travels: travelData
        }
    });
  };

module.exports = {getVoyage};
