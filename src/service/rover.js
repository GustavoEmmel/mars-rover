const RoverDomain = require("../domain/rover");

module.exports = class RoverService {
  constructor(plateau) {
    this.rover = new RoverDomain();
    this.plateau = plateau;
  }

  land(position) {
    this.rover.x = position[0];
    this.rover.y = position[1];
    this.rover.facing = position[2];
  }

  getPosition() {
    return { ...this.rover };
  }
};
