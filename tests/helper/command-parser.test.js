const {
  parseLanding,
  parsePlateauSize,
  parseRoverMovement,
} = require("../../src/helper/command-parser");

describe("command-parser:parseLanding", () => {
  it("should parse landing commands", () => {
    const result = parseLanding("1 2 N");
    expect(result).toEqual([1, 2, "N"]);
  });

  it("should invalidate facing command", () => {
    let err = "";
    try {
      parseLanding("1 2 n3");
    } catch (e) {
      err = e;
    }
    expect(err).toEqual("invalid landing command list");
  });

  it("should validate landing commands size", () => {
    let err = "";
    try {
      parseLanding("1 2");
    } catch (e) {
      err = e;
    }
    expect(err).toEqual("invalid landing command size");
  });

  it("should validate landing commands direction", () => {
    let err = "";
    try {
      parseLanding("1 2 3");
    } catch (e) {
      err = e;
    }
    expect(err).toEqual("invalid landing command list");
  });

  it("should validate landing commands position", () => {
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
  it("should parse plateau size commands", () => {
    const result = parsePlateauSize("5 5");
    expect(result).toEqual(["5", "5"]);
  });

  it("should validate plateau size commands size", () => {
    let err = "";
    try {
      parsePlateauSize("1 2 3");
    } catch (e) {
      err = e;
    }
    expect(err).toEqual("invalid plateau command size");
  });

  it("should validate plateau commands type", () => {
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
  it("should parse rover movement commands", () => {
    const result = parseRoverMovement("LMLMLMLMMR");
    expect(result).toEqual(["L", "M", "L", "M", "L", "M", "L", "M", "M", "R"]);
  });

  it("should parse rover movement commands with lower cases", () => {
    const result = parseRoverMovement("LMLMlMLmMR");
    expect(result).toEqual(["L", "M", "L", "M", "L", "M", "L", "M", "M", "R"]);
  });

  it("should validate invalid movement commands", () => {
    let err = "";
    try {
      parseRoverMovement("LMLMlMLmx1MR");
    } catch (e) {
      err = e;
    }
    expect(err).toEqual("invalid rover movement command list");
  });
  
});
