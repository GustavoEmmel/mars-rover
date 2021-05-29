exports.parseRoverMovement = (command) => {
    let movement = command.split("");
    movement = movement.map(el => el.toUpperCase());
  
    if (!movement.every((el) => ['L', 'M', 'R'].includes(el))) {
      throw "invalid rover movement command list";
    }
  
    return movement;
  };

exports.parsePlateauSize = (command) => {
  const plateau = command.split(" ");
  if (plateau.length !== 2) {
    throw "invalid plateau command size";
  }

  if (![plateau[0], plateau[1]].every((el) => parseInt(el) == el)) {
    throw "invalid plateau command list";
  }

  return plateau;
};

exports.parseLanding = (command) => {
  const landing = command.split(" ");
  if (landing.length !== 3) {
    throw "invalid landing command size";
  }

  if (
    ![landing[0], landing[1]].every((el) => parseInt(el) == el) ||
    parseInt(landing[2]) == landing[2]
  ) {
    throw "invalid landing command list";
  }

  return landing;
};
