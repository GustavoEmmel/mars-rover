const PlateauService = require("./src/service/plateau");
const NasaService = require("./src/service/nasa");
const { parsePlateauSize } = require("./src/helper/command-parser");

run = () => {
  console.log("starting...");

  try {
    const plateauSize = "5 5";

    const plateau = new PlateauService();
    plateau.create(parsePlateauSize(plateauSize));

    const mission1 = new NasaService(plateau);
    const mission2 = new NasaService(plateau);
    const result1 = mission1.runMission("1 2 N", "LMLMLMLMM");
    const result2 = mission2.runMission("3 3 E", "MMRMMRMRRM");

    console.log("output1: ", result1);
    console.log("output2: ", result2);
  } catch (err) {
    console.log(err);
  }
};

run();
