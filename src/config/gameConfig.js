const gameConfigurations = {
  easy: {
    // id: "easy",
    sizeX: 10,
    sizeY: 8,
    numberOfBombs: 10
  },
  medium: {
    // id: "medium",
    sizeX: 18,
    sizeY: 14,
    numberOfBombs: 40
  },
  hard: {
    // id: "hard",
    sizeX: 24,
    sizeY: 20,
    numberOfBombs: 100
  }
};

gameConfigurations.default = gameConfigurations.medium;


export default gameConfigurations;