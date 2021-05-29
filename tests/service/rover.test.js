const PlateauService = require("../../src/service/plateau");
const RoverService = require("../../src/service/rover");

describe("rover-service:land/getPosition", () => {
  test("should get position at landing input of 1 2 N", () => {
    const plateau = new PlateauService();
    plateau.create(["5", "5"]);
    const rover = new RoverService(plateau);
    rover.land(["1", "2", "N"]);
    const position = rover.getPosition();
    expect(position).toEqual({ x: 1, y: 2, facing: "N" });
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

describe("rover-service:turnRight/turnLeft", () => {
  test("rover should turn right from North and face East", () => {
    const plateau = new PlateauService();
    plateau.create(["5", "5"]);
    const rover = new RoverService(plateau);
    rover.land(["1", "2", "N"]);
    rover.turnRight();
    const position = rover.getPosition();
    expect(position).toEqual({ x: 1, y: 2, facing: "E" });
  });

  test("rover should turn left from West and face South", () => {
    const plateau = new PlateauService();
    plateau.create(["5", "5"]);
    const rover = new RoverService(plateau);
    rover.land(["1", "2", "W"]);
    rover.turnLeft();
    const position = rover.getPosition();
    expect(position).toEqual({ x: 1, y: 2, facing: "S" });
  });
});

describe("rover-service:move", () => {
  test("should successfully move one block from North", () => {
    const plateau = new PlateauService();
    plateau.create(["5", "5"]);
    const rover = new RoverService(plateau);
    rover.land(["1", "2", "N"]);
    rover.move();
    const position = rover.getPosition();
    expect(position).toEqual({ x: 1, y: 3, facing: "N" });
  });

  test("should successfully move one block from East", () => {
    const plateau = new PlateauService();
    plateau.create(["5", "5"]);
    const rover = new RoverService(plateau);
    rover.land(["1", "2", "E"]);
    rover.move();
    const position = rover.getPosition();
    expect(position).toEqual({ x: 2, y: 2, facing: "E" });
  });

  test("should successfully move one block from South", () => {
    const plateau = new PlateauService();
    plateau.create(["5", "5"]);
    const rover = new RoverService(plateau);
    rover.land(["1", "2", "S"]);
    rover.move();
    const position = rover.getPosition();
    expect(position).toEqual({ x: 1, y: 1, facing: "S" });
  });

  test("should successfully move one block from West", () => {
    const plateau = new PlateauService();
    plateau.create(["5", "5"]);
    const rover = new RoverService(plateau);
    rover.land(["1", "2", "W"]);
    rover.move();
    const position = rover.getPosition();
    expect(position).toEqual({ x: 0, y: 2, facing: "W" });
  });

  test("should fail to move one block from North", () => {
    let err = "";

    try {
      const plateau = new PlateauService();
      plateau.create(["5", "5"]);
      const rover = new RoverService(plateau);
      rover.land(["2", "5", "N"]);
      rover.move();
    } catch (e) {
      err = e;
    }
    expect(err).toEqual("cannot move to that location");
  });

  test("should fail to move one block from East", () => {
    let err = "";

    try {
      const plateau = new PlateauService();
      plateau.create(["5", "5"]);
      const rover = new RoverService(plateau);
      rover.land(["5", "2", "E"]);
      rover.move();
    } catch (e) {
      err = e;
    }
    expect(err).toEqual("cannot move to that location");
  });

  test("should fail to move one block from South", () => {
    let err = "";

    try {
      const plateau = new PlateauService();
      plateau.create(["5", "5"]);
      const rover = new RoverService(plateau);
      rover.land(["5", "0", "S"]);
      rover.move();
    } catch (e) {
      err = e;
    }
    expect(err).toEqual("cannot move to that location");
  });

  test("should fail to move one block from West", () => {
    let err = "";

    try {
      const plateau = new PlateauService();
      plateau.create(["5", "5"]);
      const rover = new RoverService(plateau);
      rover.land(["0", "2", "W"]);
      rover.move();
    } catch (e) {
      err = e;
    }
    expect(err).toEqual("cannot move to that location");
  });
});
