const NasaService = require("../../src/service/nasa");
const PlateauService = require("../../src/service/plateau");
const { parsePlateauSize } = require("../../src/helper/command-parser");

describe("nasa-service:runMission", () => {
  it("user story", () => {
    const plateauSize = "5 5";

    const plateau = new PlateauService();
    plateau.create(parsePlateauSize(plateauSize));

    const mission1 = new NasaService(plateau);
    const mission2 = new NasaService(plateau);
    const result1 = mission1.runMission([1, 2, "N"], ["L", "M", "L", "M", "L", "M", "L", "M", "M"]);
    const result2 = mission2.runMission([3, 3, "E"], ["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"] );

    expect(result1).toEqual("1 3 N");
    expect(result2).toEqual("5 1 E");
  });

  it("should return error for 2 rovers on the same spot", () => {
    let err = "";

    try {
      const plateauSize = "5 5";

      const plateau = new PlateauService();
      plateau.create(parsePlateauSize(plateauSize));

      const mission1 = new NasaService(plateau);
      const mission2 = new NasaService(plateau);
      const result1 = mission1.runMission([3, 3, "E"], ["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"]);
      mission2.runMission([3, 3, "E"], ["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"]);
      expect(result1).toEqual("5 1 E");
    } catch (e) {
      err = e;
    }

    expect(err).toEqual("cannot move to that location");
  });
});
