const coreDomain = jest.createMockFromModule('core-domain');

coreDomain.generateId = () => '3b09a829-1c21-4967-afc0-b054d3899619';

module.exports = coreDomain;
