const BaseballGame = require("./baseballGame.js");
const GameData = require("./gameData.js");
const { prompt } = require("enquirer");

module.exports = class Game {
  constructor() {
    this.gameData = new GameData();
    this.baseballGame = new BaseballGame();
  }

  async playGame() {
    const gameData = this.gameData.read();
    const highSchool =
      "nameOfHighSchool" in gameData
        ? gameData.nameOfHighSchool
        : await this.#decideName();
    this.#explain(highSchool);
    const wins = await this.#playTournament(highSchool);
    this.#showResult(wins, highSchool);
  }

  async #decideName() {
    const response = await prompt({
      type: "input",
      name: "highSchool",
      message: "高校名を入力してください（末尾に「高校」は付けないでください）",
    });
    const gameData = this.gameData.read();
    gameData.nameOfHighSchool = response.highSchool;
    this.gameData.write(gameData);
    return response.highSchool;
  }

  #explain(highSchool) {
    const gameData = this.gameData.read();
    const playCount =
      "playRecords" in gameData ? gameData.playRecords.length + 1 : 1;
    if (playCount === 1) {
      console.log(
        `甲子園初出場となる${highSchool}高校。果たして優勝を手にすることはできるのか……。\n`
      );
    }

    if (playCount > 1) {
      const wins = gameData.playRecords.map(
        (playRecord) => playRecord.numberOfWins
      );
      const numberOfChampionships = wins.filter((win) => win === 3).length;

      if (numberOfChampionships === 0) {
        console.log(
          `今年で甲子園出場${playCount}回目となる${highSchool}高校。果たして初優勝を手にすることはできるのか……。\n`
        );
      }
      if (numberOfChampionships > 0) {
        console.log(
          `今までに${numberOfChampionships}回の優勝を経験した${highSchool}高校。甲子園出場${playCount}回目となる今年、果たして優勝を手にすることはできるのか……。\n`
        );
      }
    }

    const description = [
      "【操作説明】\nあなたはバッターです。",
      "相手投手の球種がいくつか表示されます。球種を1つ選びましょう。",
      "↑ と↓ キーで球種を選択、Enterキーで球種を決定できます。",
      "相手の投げた球種とあなたの選択した球種が一致した場合、あなたの勝ちです。",
      "球種が一致しなかった場合、ストライクが1つ増えます。",
      "ストライクが3つになった場合、あなたの負けです。",
      "試合は最大3試合です。",
      "監督が伝えてくる特徴を参考にしながら、試合を勝利に導きましょう！\n",
    ];
    console.log(description.join("\n"));
  }

  #createResult(wins) {
    const numberOfWins = {
      numberOfWins: wins,
    };
    const gameData = this.gameData.read();
    gameData.playRecords.push(numberOfWins);
    this.gameData.write(gameData);
  }

  #showResult(wins, highSchool) {
    if (wins < 3) {
      console.log(`${highSchool}高校の夏は終わった……。`);
    } else {
      console.log("監督「よくやった！これで優勝だ！！」");
      console.log(`${highSchool}高校は甲子園で優勝した！`);
    }
  }

  async #playTournament(highSchool) {
    let wins = 0;
    const firstRound = await this.baseballGame.playFirstRound();
    if (!firstRound) {
      this.#createResult(wins);
      return wins;
    }

    wins++;
    const semifinals = await this.baseballGame.playSemifinals(highSchool);
    if (!semifinals) {
      this.#createResult(wins);
      return wins;
    }

    wins++;
    const final = await this.baseballGame.playFinal(highSchool);
    if (!final) {
      this.#createResult(wins);
      return wins;
    } else {
      wins++;
      this.#createResult(wins);
      return wins;
    }
  }
};
