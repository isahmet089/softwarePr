class TransportStrategy {
    calculateDetails(from, to, date) {
        throw new Error('calculateDetails method must be implemented');
    }
}

module.exports = TransportStrategy; 