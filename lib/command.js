const Game = require("./game.js");
const GameData = require("./game_data.js");

module.exports = class Command {
  constructor(option) {
    this.option = option;
  }
  runGame() {
    const optionCount = Object.keys(this.option).length;
    switch (optionCount) {
      case 0:
        new Game().playGame();
        break;
      case 1:
        if (this.option.d) {
          new GameData().delete();
          break;
        }
      // ESLintの指摘を回避するためにfalls throughを記載
      // falls through
      default:
        console.log("指定されたオプションは存在しません");
    }
  }
};
