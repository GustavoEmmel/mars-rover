const PlateauService = require("../../src/service/plateau");
const RoverService = require("../../src/service/rover");

describe("rover-service:land/getPosition", () => {
  test("should get position at landing input of 1 2 N", () => {
    const plateau = new PlateauService();
    plateau.create(["5", "5"]);
    const rover = new RoverService(plateau);
    rover.land(["1", "2", "N"]);
    const position = rover.getPosition();
    expect(position).toEqual({ x: "1", y: "2", facing: "N" });
  });

  test("should not be able to land on invalid position", () => {
    let err = "";
    try {
      const plateau = new PlateauService();
      plateau.create(["2", "5"]);
      const rover = new RoverService(plateau);
      rover.land(["3", "2", "N"]);
    } catch (e) {
      err = e;
    }

    expect(err).toEqual("invalid landing position");
  });

  test("should not be able to land with another rover", () => {
    let err = "";
    try {
      const plateau = new PlateauService();
      plateau.create(["5", "5"]);
      plateau.park({ x: "3", y: "2", facing: "N" });
      const rover = new RoverService(plateau);
      rover.land(["3", "2", "N"]);
    } catch (e) {
      err = e;
    }

    expect(err).toEqual("invalid landing position");
  });
});
