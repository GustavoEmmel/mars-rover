const PlateauDomain = require("../domain/plateau");

module.exports = class PlateauService {
  constructor() {
    this.plateau = new PlateauDomain();
  }

  create(size) {
    this.plateau.x = size[0];
    this.plateau.y = size[1];
  }

  isValidPosition(position) {
      console.log('plateau', this.plateau);
      console.log('position', position);
  }
};
