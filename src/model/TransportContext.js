const OtobusStrategy = require('./OtobusStrategy');
const UcakStrategy = require('./UcakStrategy');
const TrenStrategy = require('./TrenStrategy');

class TransportContext {
  constructor(data) {
    this.data = data;
  }

  getStrategy(type) {
    switch (type) {
      case 'Otobüs':
        return new OtobusStrategy(this.data);
      case 'Uçak':
        return new UcakStrategy(this.data);
      case 'Tren':
        return new TrenStrategy(this.data);
      default:
        throw new Error("Unknown transport type.");
    }
  }

  getDetails(type, from, to, date) {
    const strategy = this.getStrategy(type);
    return strategy.calculateDetails(from, to, date);
  }
}

module.exports = TransportContext;
