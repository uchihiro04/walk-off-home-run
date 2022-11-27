const GameFormat = require("./gameFormat.js");
const GameData = require("./gameData.js");

module.exports = class Command {
  constructor(option) {
    this.option = option;
  }
  runGame() {
    const numberOfOptions = Object.keys(this.option).length;
    if (this.option.d && numberOfOptions === 2) {
      return new GameData().delete();
    }
    if (numberOfOptions >= 2) {
      return console.log("指定されたオプションは存在しません");
    }
    return new GameFormat().playGame();
  }
};
