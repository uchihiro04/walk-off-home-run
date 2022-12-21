const Game = require("./game.js");

module.exports = class Command {
  constructor(option) {
    this.option = option;
  }
  runGame() {
    const optionCount = Object.keys(this.option).length;
    const game = new Game();
    switch (optionCount) {
      case 0:
        game.play();
        break;
      case 1:
        if (this.option.d) {
          game.deleteData();
          break;
        }
      // ESLintの指摘を回避するためにfalls throughを記載
      // falls through
      default:
        console.log("指定されたオプションは存在しません");
    }
  }
};
