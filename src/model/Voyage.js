const fs = require('fs');
const path = require('path');

// Seyahat verisini JSON dosyasından okuma
const getTravelData = () => {
  const dataPath = path.join(__dirname, '../data/data.json');
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
};

// Seyahat verisini döndürme
const getAllTravels = () => {
  return getTravelData();
};

// Filtreleme işlemi
const getTravelsByLocation = (from, to) => {
  const travelData = getTravelData();
  return travelData.filter(item => 
    (from ? item.from.toLowerCase() === from.toLowerCase() : true) &&
    (to ? item.to.toLowerCase() === to.toLowerCase() : true)
  );
};

module.exports = { getAllTravels, getTravelsByLocation };
