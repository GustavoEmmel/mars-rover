const NORTH = "N";
const EAST = "E";
const SOUTH = "S";
const WEST = "W";

module.exports = {
  CARDINAL_POINTS: {
    NORTH,
    EAST,
    SOUTH,
    WEST,
  },
  DIRECTIONS: {
    [NORTH]: { right: EAST, left: WEST },
    [EAST]: { right: SOUTH, left: NORTH },
    [SOUTH]: { right: WEST, left: EAST },
    [WEST]: { right: NORTH, left: SOUTH },
  },
};
