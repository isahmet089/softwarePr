const BusStrategy = require('../strategy/BusStrategy');
const PlaneStrategy = require('../strategy/PlaneStrategy');
const TrainStrategy = require('../strategy/TrainStrategy');

const strategyMap = {
    Otobüs: new BusStrategy(),
    Uçak: new PlaneStrategy(),
    Tren: new TrainStrategy()
};
const  getPayment = async (req, res) => {
    const { id , type } = req.params;
    const strategy = strategyMap[type];
    if (!strategy) {
        return res.status(400).send("Geçersiz taşıma türü");
    }

    const ticket = await strategy.getTicketById(id);
   
    if (!ticket) {
        return res.status(404).send("Bilet bulunamadı");
    }
    const price = await strategy.priceDetails(id);
    if (!req.session.user) {
      const indirim = await strategy.getDiscount("yetiskin");
      res.render("payment", {ticket,price,indirim});
    }else {
        const indirim = await strategy.getDiscount(req.session.user.userType);
        res.render("payment", {ticket,price,indirim});
    }
};
module.exports = {
    getPayment
};