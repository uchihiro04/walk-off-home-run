#! /usr/bin/env node

const { prompt } = require("enquirer");
const { quiz } = require("enquirer");
const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));

class GameData {
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
}

class Pitcher {
  pitchInFirstRound() {
    return {
      name: "varieyOfPitches",
      message: "相手はこの球を投げてくるはず！",
      choices: ["ストレート", "カーブ", "フォーク"],
      correctChoice: new PitchType().selectPitchTypeForFirstRound(),
    };
  }

  pitchInSemifinals() {
    return {
      name: "varieyOfPitches",
      message: "相手はこの球を投げてくるはず！",
      choices: [
        "ストレート",
        "スライダー",
        "フォーク",
        "チェンジアップ",
        "シンカー",
      ],
      correctChoice: new PitchType().selectPitchTypeForSemifinals(),
    };
  }

  pitchInFinal() {
    return {
      name: "varieyOfPitches",
      message: "相手はこの球を投げてくるはず！",
      choices: [
        "ストレート",
        "スライダー",
        "カットボール",
        "カーブ",
        "フォーク",
        "スプリット",
        "シュート",
      ],
      correctChoice: new PitchType().selectPitchTypeForFinal(),
    };
  }
}

class PitchType {
  selectPitchTypeForFirstRound() {
    const number = Math.floor(Math.random() * 100);
    if (number < 50) {
      return 0;
    }
    if (50 <= number && number < 75) {
      return 1;
    }
    if (75 <= number && number < 100) {
      return 2;
    }
  }

  selectPitchTypeForSemifinals() {
    const number = Math.floor(Math.random() * 100);
    if (number < 15) {
      return 0;
    }
    if (15 <= number && number < 30) {
      return 1;
    }
    if (30 <= number && number < 60) {
      return 2;
    }
    if (60 <= number && number < 90) {
      return 3;
    }
    if (90 <= number && number < 100) {
      return 4;
    }
  }

  selectPitchTypeForFinal() {
    const number = Math.floor(Math.random() * 100);
    if (number < 20) {
      return 0;
    }
    if (20 <= number && number < 25) {
      return 1;
    }
    if (25 <= number && number < 45) {
      return 2;
    }
    if (45 <= number && number < 50) {
      return 3;
    }
    if (50 <= number && number < 60) {
      return 4;
    }
    if (60 <= number && number < 80) {
      return 5;
    }
    if (80 <= number && number < 100) {
      return 6;
    }
  }
}

class Game {
  async decideName() {
    const response = await prompt({
      type: "input",
      name: "highSchool",
      message: "高校名を入力してください（末尾に「高校」は付けないでください）",
    });
    const gameData = new GameData().read();
    gameData.nameOfHighSchool = response.highSchool;
    new GameData().write(gameData);
    return response.highSchool;
  }

  explainGame(highSchool) {
    const playCount =
      "playRecords" in new GameData().read()
        ? new GameData().read().playRecords.length + 1
        : 1;
    if (playCount === 1) {
      console.log(
        `甲子園初出場となる${highSchool}高校。果たして優勝を手にすることはできるのか……。\n`
      );
    }

    if (playCount > 1) {
      const wins = new GameData()
        .read()
        .playRecords.map((playRecord) => playRecord.numberOfWins);
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

    const pitching = new Pitcher().pitchInFirstRound;
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

    const pitching = new Pitcher().pitchInSemifinals;
    return this.playMatch(pitching);
  }

  playFinal() {
    console.log("監督「よくやった！これで決勝進出だ！」");
    console.log("\n快進撃を続けるnpm高校は、ついに決勝まで勝ち上がった……");
    console.log("\n決勝 9回裏3対0 2アウト満塁 ");
    console.log(
      "監督「相手は直球とスピードのある変化球を織り交ぜてくるようだ。特徴を頭に入れて打席に立つんだぞ」\n"
    );

    const pitching = new Pitcher().pitchInFinal;
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

  createResult(wins, highSchool) {
    const numberOfWins = {
      numberOfWins: wins,
    };
    const gameData = new GameData().read();
    gameData.playRecords.push(numberOfWins);
    new GameData().write(gameData);

    if (wins < 3) {
      return console.log(`${highSchool}高校の夏は終わった……`);
    }
    console.log("監督「よくやった！これで優勝だ！！」");
    console.log(`${highSchool}高校は甲子園で優勝した！`);
  }

  async playGame() {
    const highSchool =
      "nameOfHighSchool" in new GameData().read()
        ? new GameData().read().nameOfHighSchool
        : await this.decideName();
    this.explainGame(highSchool);
    let wins = 0;
    const firstRound = await this.playFirstRound();
    if (!firstRound) {
      return this.createResult(wins, highSchool);
    }

    const semifinals = await this.playSemifinals();
    wins++;
    if (!semifinals) {
      return this.createResult(wins, highSchool);
    }

    const final = await this.playFinal();
    wins++;
    if (!final) {
      return this.createResult(wins, highSchool);
    } else {
      wins++;
      return this.createResult(wins, highSchool);
    }
  }
}

class Command {
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
    new Game().playGame();
  }
}

new Command(argv).runGame();
