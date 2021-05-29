const {
  parseLanding,
  parsePlateauSize,
  parseRoverMovement,
} = require("../../src/helper/command-parser");

describe("command-parser:parseLanding", () => {
  test("should parse landing commands", () => {
    const result = parseLanding("1 2 N");
    expect(result).toEqual([1, 2, "N"]);
  });

  test("should validate landing commands size", () => {
    let err = "";
    try {
      parseLanding("1 2");
    } catch (e) {
      err = e;
    }
    expect(err).toEqual("invalid landing command size");
  });

  test("should validate landing commands direction", () => {
    let err = "";
    try {
      parseLanding("1 2 3");
    } catch (e) {
      err = e;
    }
    expect(err).toEqual("invalid landing command list");
  });

  test("should validate landing commands position", () => {
    let err = "";
    try {
      parseLanding("1 S N");
    } catch (e) {
      err = e;
    }
    expect(err).toEqual("invalid landing command list");
  });
});

describe("command-parser:parsePlateauSize", () => {
  test("should parse plateau size commands", () => {
    const result = parsePlateauSize("5 5");
    expect(result).toEqual(["5", "5"]);
  });

  test("should validate plateau size commands size", () => {
    let err = "";
    try {
      parsePlateauSize("1 2 3");
    } catch (e) {
      err = e;
    }
    expect(err).toEqual("invalid plateau command size");
  });

  test("should validate plateau commands type", () => {
    let err = "";
    try {
      parsePlateauSize("1 S");
    } catch (e) {
      err = e;
    }
    expect(err).toEqual("invalid plateau command list");
  });
});

describe("command-parser:parseRoverMovement", () => {
  test("should parse rover movement commands", () => {
    const result = parseRoverMovement("LMLMLMLMMR");
    expect(result).toEqual(["L", "M", "L", "M", "L", "M", "L", "M", "M", "R"]);
  });

  test("should parse rover movement commands with lower cases", () => {
    const result = parseRoverMovement("LMLMlMLmMR");
    expect(result).toEqual(["L", "M", "L", "M", "L", "M", "L", "M", "M", "R"]);
  });

  test("should validate invalid movement commands", () => {
    let err = "";
    try {
      parseRoverMovement("LMLMlMLmx1MR");
    } catch (e) {
      err = e;
    }
    expect(err).toEqual("invalid rover movement command list");
  });
  
});
