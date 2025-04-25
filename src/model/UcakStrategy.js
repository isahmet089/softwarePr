const TransportStrategy = require('./TransportStrategy');

class UcakStrategy extends TransportStrategy {
  constructor(data) {
    super();
    this.data = data;
  }

  calculateDetails(from, to, date) {
    return this.data.filter(sefer => sefer.from === from && sefer.to === to && sefer.departure_date === date && sefer.type === "Uçak");
  }
}

module.exports = UcakStrategy;
