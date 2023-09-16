const gameConfigurations = {
  easy: {
    // id: "easy",
    sizeX: 10,
    sizeY: 10,
    numberOfBombs: 10
  },
  medium: {
    // id: "medium",
    sizeX: 20,
    sizeY: 20,
    numberOfBombs: 20
  },
  hard: {
    // id: "hard",
    sizeX: 30,
    sizeY: 30,
    numberOfBombs: 30
  }
};

gameConfigurations.default = gameConfigurations.medium;


export default gameConfigurations;