const RoverService = require("../../src/service/rover");

describe("rover-service:land/getPosition", () => {
  test("should get position at landing input of 1 2 N", () => {
    const rover = new RoverService();
    rover.land(["1", "2", "N"]);
    const position = rover.getPosition();
    expect(position).toEqual({ x: "1", y: "2", facing: "N" });
  });
});
