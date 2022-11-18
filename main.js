#! /usr/bin/env node

const { quiz } = require("enquirer");

function showSynopsis() {
  console.log(
    "甲子園に初出場したnpm高校。前評判を覆し、優勝することはできるのか……。\n"
  );
}

function explain() {
  const description = [
    "【操作説明】\n相手の球種がいくつか表示されます。球種を1つ選びましょう。",
    "↑ と↓ キーで球種を選択、Enterキーで球種を決定できます。",
    "相手の投げた球種とあなたの選択した球種が一致した場合、あなたの勝ちです。",
    "球種が一致しなかった場合、ストライクが1つ増えます。",
    "ストライクが3つになった場合、あなたの負けです。",
    "試合は最大3試合です。",
    "監督が伝えてくる特徴をヒントに、試合を勝利に導きましょう！\n",
  ];
  console.log(description.join("\n"));
}

function explainFirstRound() {
  console.log("1回戦 9回裏4対3 2アウト1塁 ");
  console.log(
    "監督「相手はストレートに自信を持っているようだ。特徴を頭に入れて打席に立つんだぞ」"
  );
}

function createPictcherOfFirstRound() {
  const pitcherOfFirstRound = {
    varietyOfPitches: ["ストレート", "カーブ", "フォーク"],
  };
  return pitcherOfFirstRound;
}

function createPictcherOfSemifinals() {
  const pitcherOfSemifinals = {
    varietyOfPitches: [
      "ストレート",
      "スライダー",
      "フォーク",
      "チェンジアップ",
      "シンカー",
    ],
  };
  return pitcherOfSemifinals;
}

function createPictcherOfFinal() {
  const pitcherOfFinal = {
    varietyOfPitches: [
      "ストレート",
      "スライダー",
      "カットボール",
      "カーブ",
      "フォーク",
      "スプリット",
      "シュート",
    ],
  };
  return pitcherOfFinal;
}

async function playFirstRound() {
  const firstPitches = await quiz({
    name: "varieyOfPitches",
    message: "相手はこの球を投げてくるはず！",
    choices: createPictcherOfFirstRound().varietyOfPitches,
    correctChoice: determinePitchTypeForFirstRound(),
  });

  if (firstPitches.correct) {
    console.log("ホームラン！");
    return true;
  } else {
    console.log("空振り…… 狙いが外れたか");
  }

  const secondPitches = await quiz({
    name: "varieyOfPitches",
    message: "相手はこの球を投げてくるはず！",
    choices: createPictcherOfFirstRound().varietyOfPitches,
    correctChoice: determinePitchTypeForFirstRound(),
  });

  if (secondPitches.correct) {
    console.log("ホームラン！");
    return true;
  } else {
    console.log("空振り…… 追い込まれたぞ");
  }

  const thirdPitches = await quiz({
    name: "varieyOfPitches",
    message: "相手はこの球を投げてくるはず！",
    choices: createPictcherOfFirstRound().varietyOfPitches,
    correctChoice: determinePitchTypeForFirstRound(),
  });

  if (thirdPitches.correct) {
    console.log("ホームラン！");
    return true;
  } else {
    console.log("三振…… 試合に負けてしまった……");
    return false;
  }
}

function explainSemifinals() {
  console.log("\n準決勝 9回裏8対6 2アウト1、2塁 ");
  console.log(
    "監督「相手は2種類の落ちる球を武器にしているようだ。特徴を頭に入れて打席に立つんだぞ」"
  );
}

async function playSemifinals() {
  const firstPitches = await quiz({
    name: "varieyOfPitches",
    message: "相手はこの球を投げてくるはず！",
    choices: createPictcherOfSemifinals().varietyOfPitches,
    correctChoice: determinePitchTypeForSemifinals(),
  });

  if (firstPitches.correct) {
    console.log("ホームラン！");
    return true;
  } else {
    console.log("空振り…… 狙いが外れたか");
  }

  const secondPitches = await quiz({
    name: "varieyOfPitches",
    message: "相手はこの球を投げてくるはず！",
    choices: createPictcherOfSemifinals().varietyOfPitches,
    correctChoice: determinePitchTypeForSemifinals(),
  });

  if (secondPitches.correct) {
    console.log("ホームラン！");
    return true;
  } else {
    console.log("空振り…… 追い込まれたぞ");
  }

  const thirdPitches = await quiz({
    name: "varieyOfPitches",
    message: "相手はこの球を投げてくるはず！",
    choices: createPictcherOfSemifinals().varietyOfPitches,
    correctChoice: determinePitchTypeForSemifinals(),
  });

  if (thirdPitches.correct) {
    console.log("ホームラン！");
    return true;
  } else {
    console.log("三振…… 試合に負けてしまった……");
    return false;
  }
}

function explainFinals() {
  console.log("\n決勝 9回裏3対0 2アウト1塁 ");
  console.log(
    "監督「相手は直球とスピードのある変化球を織り交ぜてくるようだ。特徴を頭に入れて打席に立つんだぞ」"
  );
}

async function playFinal() {
  const firstPitches = await quiz({
    name: "varieyOfPitches",
    message: "相手はこの球を投げてくるはず！",
    choices: createPictcherOfFinal().varietyOfPitches,
    correctChoice: determinePitchTypeForFinal(),
  });

  if (firstPitches.correct) {
    console.log("ホームラン！");
    return true;
  } else {
    console.log("空振り…… 狙いが外れたか");
  }

  const secondPitches = await quiz({
    name: "varieyOfPitches",
    message: "相手はこの球を投げてくるはず！",
    choices: createPictcherOfFinal().varietyOfPitches,
    correctChoice: determinePitchTypeForFinal(),
  });

  if (secondPitches.correct) {
    console.log("ホームラン！");
    return true;
  } else {
    console.log("空振り…… 追い込まれたぞ");
  }

  const thirdPitches = await quiz({
    name: "varieyOfPitches",
    message: "相手はこの球を投げてくるはず！",
    choices: createPictcherOfFinal().varietyOfPitches,
    correctChoice: determinePitchTypeForFinal(),
  });

  if (thirdPitches.correct) {
    console.log("ホームラン！");
    return true;
  } else {
    console.log("三振…… 試合に負けてしまった……");
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

function showDefeatScreen() {
  console.log("npm高校の夏は終わった……");
}

function showClearScreen() {
  console.log("npm高校は甲子園で優勝した！");
}

async function gameRun() {
  showSynopsis();
  explain();
  explainFirstRound();
  const firstRound = await playFirstRound();
  if (!firstRound) {
    return showDefeatScreen();
  }

  explainSemifinals();
  const semifinals = await playSemifinals();
  if (!semifinals) {
    return showDefeatScreen();
  }

  explainFinals();
  const final = await playFinal();
  if (!final) {
    return showDefeatScreen();
  } else {
    return showClearScreen();
  }
}

gameRun();
