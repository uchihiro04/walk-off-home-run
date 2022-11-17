#! /usr/bin/env node

const { quiz } = require("enquirer");

async function playFirstRound() {
  const firstPitches = await quiz({
    name: "varieyOfPitches",
    message: "相手はこの球を投げてくるはず！",
    choices: ["ストレート", "カーブ", "フォーク"],
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
    choices: ["ストレート", "カーブ", "フォーク"],
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
    choices: ["ストレート", "カーブ", "フォーク"],
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

async function playSemifinals() {
  const firstPitches = await quiz({
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
    choices: [
      "ストレート",
      "スライダー",
      "フォーク",
      "チェンジアップ",
      "シンカー",
    ],
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
    choices: [
      "ストレート",
      "スライダー",
      "フォーク",
      "チェンジアップ",
      "シンカー",
    ],
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

async function playFinal() {
  const firstPitches = await quiz({
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
  const firstRound = await playFirstRound();
  if (!firstRound) {
    return showDefeatScreen();
  }

  const semifinals = await playSemifinals();
  if (!semifinals) {
    return showDefeatScreen();
  }

  const final = await playFinal();
  if (!final) {
    return showDefeatScreen();
  } else {
    return showClearScreen();
  }
}

gameRun();
