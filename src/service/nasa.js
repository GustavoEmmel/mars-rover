const RoverService = require("./rover");
const { parseOutput } = require("../helper/command-parser");

module.exports = class NasaService {
  constructor(plateau) {
    this.plateau = plateau;
  }

  runMission(landingSite, navigation) {
    try {
      const rover = new RoverService(this.plateau);
      rover.land(landingSite);
      navigation.forEach((cmd) => {
        switch (cmd) {
          case "R":
            rover.turnRight();
            break;
          case "L":
            rover.turnLeft();
            break;
          case "M":
            rover.move();
            break;
          default:
            throw "invalid command";
        }
      });
      const position = rover.getPosition();
      this.plateau.park(position);
      return parseOutput(position);
    } catch (err) {
      throw err;
    }
  }
};
