const PlateauService = require("./src/service/plateau");
const NasaService = require("./src/service/nasa");
const {
  parsePlateauSize,
  parseLanding,
  parseRoverMovement,
} = require("./src/helper/command-parser");

const readlineSync = require("readline-sync");
let plateauSizeArray = null;
const missionArray = [];
let roverName = null;
getPlateauSize = () => {
  try {
    const plateauSize = readlineSync.question(
      "Type plateau size with two numbers separated by space: "
    );
    plateauSizeArray = parsePlateauSize(plateauSize);
  } catch (err) {
    console.log(err);
    getPlateauSize();
  }
};

createMission = () => {
  try {
    const landingInstructions = readlineSync.question(
      "Type landing co-ordinates for the Rover. The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover's orientation: "
    );
    const landingArray = parseLanding(landingInstructions);

    const navigationInstructions = readlineSync.question(
      "Type navigation instructions (i.e a string containing 'L', 'R', or 'M'): "
    );
    const navigationArray = parseRoverMovement(navigationInstructions);

    missionArray.push({
      landing: landingArray,
      navigation: navigationArray,
    });

    const createAnother = readlineSync.question("Type Y to launch another mission: ");

    if (createAnother.toUpperCase() === "Y") {
      createMission();
    }
  } catch (err) {
    console.log(err);
    console.log("Creating mission again...");
    createMission();
  }
};

run = async () => {
  try {
    console.log("starting...");
    await getPlateauSize();

    const plateau = new PlateauService();
    plateau.create(plateauSizeArray);

    await createMission();

    let i = 1;
    missionArray.forEach((mission) => {
      roverName = `Rover${i}:`;
      const nasa = new NasaService(plateau);
      const result = nasa.runMission(mission.landing, mission.navigation);
      console.log(`${roverName} ${result}`);
      i++;
    });
  } catch (err) {
    console.log(`${roverName} ${err}`);
  }
};

run();
