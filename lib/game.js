const Pitcher = require("./pitcher.js");
const GameData = require("./gameData.js");
const { prompt } = require("enquirer");
const { quiz } = require("enquirer");

module.exports = class Game {
  constructor() {
    this.gameData = new GameData();
    this.pitcher = new Pitcher();
  }

  async decideName() {
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

  explainGame(highSchool) {
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
      "監督が伝えてくる特徴をヒントに、試合を勝利に導きましょう！\n",
    ];
    console.log(description.join("\n"));
  }

  playFirstRound() {
    console.log("1回戦 9回裏4対3 2アウト1塁 ");
    console.log(
      "監督「相手はストレートに自信を持っているようだ。特徴を頭に入れて打席に立つんだぞ」\n"
    );

    const pitching = this.pitcher.pitchInFirstRound;
    return this.playMatch(pitching);
  }

  playSemifinals() {
    console.log("監督「よくやった！これで初戦突破だ！」");
    console.log(
      "\nその後も勝利を積み重ねたnpm高校は、準決勝まで勝ち上がった……"
    );
    console.log("\n準決勝 9回裏8対6 2アウト1、2塁 ");
    console.log(
      "監督「相手は2種類の落ちる球を武器にしているようだ。特徴を頭に入れて打席に立つんだぞ」\n"
    );

    const pitching = this.pitcher.pitchInSemifinals;
    return this.playMatch(pitching);
  }

  playFinal() {
    console.log("監督「よくやった！これで決勝進出だ！」");
    console.log("\n快進撃を続けるnpm高校は、ついに決勝まで勝ち上がった……");
    console.log("\n決勝 9回裏3対0 2アウト満塁 ");
    console.log(
      "監督「相手は直球とスピードのある変化球を織り交ぜてくるようだ。特徴を頭に入れて打席に立つんだぞ」\n"
    );

    const pitching = this.pitcher.pitchInFinal;
    return this.playMatch(pitching);
  }

  async playMatch(pitching) {
    const firstPitches = await quiz(pitching());
    console.log(`相手の球種:${firstPitches.correctAnswer}`);
    if (firstPitches.correct) {
      console.log("ホームラン！");
      return true;
    } else {
      console.log("空振り…… これで1ストライクだ\n");
    }

    const secondPitches = await quiz(pitching());
    console.log(`相手の球種:${secondPitches.correctAnswer}`);
    if (secondPitches.correct) {
      console.log("ホームラン！");
      return true;
    } else {
      console.log("空振り…… これで2ストライク、追い込まれたぞ\n");
    }

    const thirdPitches = await quiz(pitching());
    console.log(`相手の球種:${thirdPitches.correctAnswer}`);
    if (thirdPitches.correct) {
      console.log("ホームラン！");
      return true;
    } else {
      console.log("三振…… 試合に負けてしまった……\n");
      return false;
    }
  }

  createResult(wins) {
    const numberOfWins = {
      numberOfWins: wins,
    };
    const gameData = this.gameData.read();
    gameData.playRecords.push(numberOfWins);
    this.gameData.write(gameData);
  }

  showResult(wins, highSchool) {
    if (wins < 3) {
      console.log(`${highSchool}高校の夏は終わった……`);
    } else {
      console.log("\n監督「よくやった！これで優勝だ！！」");
      console.log(`${highSchool}高校は甲子園で優勝した！`);
    }
  }

  async tournament() {
    let wins = 0;
    const firstRound = await this.playFirstRound();
    if (!firstRound) {
      this.createResult(wins);
      return wins;
    }

    wins++;
    const semifinals = await this.playSemifinals();
    if (!semifinals) {
      this.createResult(wins);
      return wins;
    }

    wins++;
    const final = await this.playFinal();
    if (!final) {
      this.createResult(wins);
      return wins;
    } else {
      wins++;
      this.createResult(wins);
      return wins;
    }
  }

  async playGame() {
    const gameData = this.gameData.read();
    const highSchool =
      "nameOfHighSchool" in gameData
        ? gameData.nameOfHighSchool
        : await this.decideName();
    this.explainGame(highSchool);
    const wins = await this.tournament(highSchool);
    this.showResult(wins, highSchool);
  }
};
