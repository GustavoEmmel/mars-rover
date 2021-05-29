const PlateauDomain = require("../domain/plateau");

module.exports = class PlateauService {
  constructor() {
    this.plateau = new PlateauDomain();
  }

  create(size) {
    this.plateau.x = size[0];
    this.plateau.y = size[1];
    this.rover = [];
  }

  park(position) {
    this.rover.push({ x: position.x, y: position.y });
  }

  isInvalidPosition(position) {
    return (
      position.x > this.plateau.x ||
      position.y > this.plateau.y ||
      this.rover.find((rover) => (rover = { x: position.x, y: position.y }))
    );
  }
};
