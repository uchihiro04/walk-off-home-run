const fs = require("fs");

module.exports = class GameData {
  constructor() {
    this.dir = "gamedb";
    this.path = `${this.dir}/game_data.json`;
  }

  read() {
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir);
    }

    const oldFile = `${this.dir}/gameData.json`;
    if (fs.existsSync(oldFile)) {
      fs.renameSync(oldFile, this.path);
    }

    if (!fs.existsSync(this.path)) {
      return { playRecords: [] };
    }

    const jsonFile = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(jsonFile);
  }

  write(gameData) {
    const jsonGameDatas = JSON.stringify(gameData);
    try {
      fs.writeFileSync(this.path, jsonGameDatas);
    } catch (error) {
      console.log(error.message);
    }
  }

  delete() {
    if (!fs.existsSync(this.dir)) {
      return console.log("データがありません");
    }
    fs.rm(this.dir, { recursive: true }, (err) => {
      if (err) throw err;
      console.log("データを削除しました");
    });
  }
};
