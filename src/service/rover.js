const RoverDomain = require("../domain/rover");
const { CARDINAL_POINTS, DIRECTIONS } = require("../constant/compass");
module.exports = class RoverService {
  constructor(plateau) {
    this.rover = new RoverDomain();
    this.plateau = plateau;
  }

  land(position) {
    if (this.plateau.isInvalidPosition({ x: position[0], y: position[1] })) {
      throw "invalid landing position";
    }
    this.rover.x = parseInt(position[0]);
    this.rover.y = parseInt(position[1]);
    this.rover.facing = position[2];
  }

  getPosition() {
    return { ...this.rover };
  }

  turnRight() {
    this.rover.facing = DIRECTIONS[this.rover.facing].right;
  }

  turnLeft() {
    this.rover.facing = DIRECTIONS[this.rover.facing].left;
  }

  move() {
    const { NORTH, EAST, SOUTH, WEST } = CARDINAL_POINTS;
    const errorMessage = "cannot move to that location";

    if (this.rover.facing === NORTH) {
      this.rover.y += 1;
    }

    if (this.rover.facing === EAST) {
      this.rover.x += 1;
    }

    if (this.rover.facing === SOUTH) {
      if (this.rover.y === 0) {
        throw errorMessage;
      }
      this.rover.y -= 1;
    }

    if (this.rover.facing === WEST) {
      if (this.rover.x === 0) {
        throw errorMessage;
      }
      this.rover.x -= 1;
    }

    if (this.plateau.isInvalidPosition({ x: this.rover.x, y: this.rover.y })) {
      throw errorMessage;
    }
  }
};
