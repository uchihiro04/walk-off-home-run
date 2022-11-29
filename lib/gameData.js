const fs = require("fs");

module.exports = class GameData {
  constructor() {
    this.directory = "gamedb";
    this.path = "gamedb/gameData.json";
  }

  read() {
    if (!fs.existsSync(this.directory)) {
      fs.mkdirSync(this.directory);
    }
    if (!fs.existsSync(this.path)) {
      return { playRecords: [] };
    }
    const jsonFile = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(jsonFile);
  }

  write(gameData) {
    const jsonGameDatas = JSON.stringify(gameData, null, 2);
    try {
      fs.writeFileSync(this.path, jsonGameDatas);
    } catch (error) {
      console.log(error.message);
    }
  }

  delete() {
    if (!fs.existsSync(this.path)) {
      return console.log("データがありません");
    }
    fs.unlink(this.path, (err) => {
      if (err) throw err;
      console.log("データを削除しました");
    });
  }
};
