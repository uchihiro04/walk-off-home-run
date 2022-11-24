#! /usr/bin/env node

const { prompt } = require("enquirer");
const { quiz } = require("enquirer");
const fs = require("fs");

async function decideName() {
  const response = await prompt({
    type: "input",
    name: "highSchool",
    message: "高校名を入力してください（末尾に「高校」は付けないでください）",
  });
  const gameData = readData();
  gameData.nameOfHighSchool = response.highSchool;
  writeData(gameData);
  return response.highSchool;
}

function explainGame(highSchool) {
  const playCount =
    "playRecords" in readData() ? readData().playRecords.length + 1 : 1;
  if (playCount === 1) {
    console.log(
      `甲子園初出場となる${highSchool}高校。果たして優勝を手にすることはできるのか……。\n`
    );
  }

  if (playCount > 1) {
    const wins = readData().playRecords.map(
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

function pitchInFirstRound() {
  return {
    name: "varieyOfPitches",
    message: "相手はこの球を投げてくるはず！",
    choices: ["ストレート", "カーブ", "フォーク"],
    correctChoice: determinePitchTypeForFirstRound(),
  };
}

function playFirstRound() {
  console.log("1回戦 9回裏4対3 2アウト1塁 ");
  console.log(
    "監督「相手はストレートに自信を持っているようだ。特徴を頭に入れて打席に立つんだぞ」\n"
  );
  return playHitter(pitchInFirstRound);
}

function pitchInSemifinals() {
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
    correctChoice: determinePitchTypeForSemifinals(),
  };
}

async function playSemifinals() {
  console.log("監督「よくやった！これで初戦突破だ！」");
  console.log("\nその後も勝利を積み重ねたnpm高校は、準決勝まで勝ち上がった……");
  console.log("\n準決勝 9回裏8対6 2アウト1、2塁 ");
  console.log(
    "監督「相手は2種類の落ちる球を武器にしているようだ。特徴を頭に入れて打席に立つんだぞ」\n"
  );

  return playHitter(pitchInSemifinals);
}

function pitchInFinal() {
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
    correctChoice: determinePitchTypeForFinal(),
  };
}

async function playFinal() {
  console.log("監督「よくやった！これで決勝進出だ！」");
  console.log("\n快進撃を続けるnpm高校は、ついに決勝まで勝ち上がった……");
  console.log("\n決勝 9回裏3対0 2アウト満塁 ");
  console.log(
    "監督「相手は直球とスピードのある変化球を織り交ぜてくるようだ。特徴を頭に入れて打席に立つんだぞ」\n"
  );

  return playHitter(pitchInFinal);
}

async function playHitter(pitch) {
  const firstPitches = await quiz(pitch());
  console.log(`相手の球種:${firstPitches.correctAnswer}`);
  if (firstPitches.correct) {
    console.log("ホームラン！");
    return true;
  } else {
    console.log("空振り…… これで1ストライクだ\n");
  }

  const secondPitches = await quiz(pitch());
  console.log(`相手の球種:${secondPitches.correctAnswer}`);
  if (secondPitches.correct) {
    console.log("ホームラン！");
    return true;
  } else {
    console.log("空振り…… これで2ストライク、追い込まれたぞ\n");
  }

  const thirdPitches = await quiz(pitch());
  console.log(`相手の球種:${thirdPitches.correctAnswer}`);
  if (thirdPitches.correct) {
    console.log("ホームラン！");
    return true;
  } else {
    console.log("三振…… 試合に負けてしまった……\n");
    return false;
  }
}

function determinePitchTypeForFirstRound() {
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

function determinePitchTypeForSemifinals() {
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

function determinePitchTypeForFinal() {
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

function readData() {
  const path = "db/gameData.json";
  if (!fs.existsSync(path)) {
    return { playRecords: [] };
  }
  const jsonFile = fs.readFileSync(path, "utf-8");
  const gameData = JSON.parse(jsonFile);
  return gameData;
}

function writeData(gameData) {
  const path = "db/gameData.json";
  const jsonGameDatas = JSON.stringify(gameData, null, 2);
  try {
    fs.writeFileSync(path, jsonGameDatas);
  } catch (error) {
    console.log(error.message);
  }
}

function createResult(wins) {
  const numberOfWins = {
    numberOfWins: wins,
  };
  const gameData = readData();
  gameData.playRecords.push(numberOfWins);
  writeData(gameData);
}

function showDefeatScreen(wins, highSchool) {
  console.log(`${highSchool}高校の夏は終わった……`);
  createResult(wins);
}

async function showClearScreen(wins, highSchool) {
  console.log("監督「よくやった！これで優勝だ！！」");
  console.log(`${highSchool}高校は甲子園で優勝した！`);
  createResult(wins);
}

async function gameRun() {
  const highSchool =
    "nameOfHighSchool" in readData()
      ? readData().nameOfHighSchool
      : await decideName();
  explainGame(highSchool);
  let wins = 0;
  const firstRound = await playFirstRound();
  if (!firstRound) {
    return showDefeatScreen(wins, highSchool);
  }

  const semifinals = await playSemifinals();
  wins++;
  if (!semifinals) {
    return showDefeatScreen(wins, highSchool);
  }

  const final = await playFinal();
  wins++;
  if (!final) {
    return showDefeatScreen(wins, highSchool);
  } else {
    wins++;
    return showClearScreen(wins, highSchool);
  }
}

gameRun();
