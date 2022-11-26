const fs = require("fs");

module.exports = class GameData {
  constructor() {
    this.path = "db/memo.json";
  }

  read() {
    const path = "db/gameData.json";
    if (!fs.existsSync(path)) {
      return { playRecords: [] };
    }
    const jsonFile = fs.readFileSync(path, "utf-8");
    return JSON.parse(jsonFile);
  }

  write(gameData) {
    const path = "db/gameData.json";
    const jsonGameDatas = JSON.stringify(gameData, null, 2);
    try {
      fs.writeFileSync(path, jsonGameDatas);
    } catch (error) {
      console.log(error.message);
    }
  }

  delete() {
    const path = "db/gameData.json";
    if (!fs.existsSync(path)) {
      return console.log("データがありません");
    }
    fs.unlink(path, (err) => {
      if (err) throw err;
      console.log("データを削除しました");
    });
  }
};
