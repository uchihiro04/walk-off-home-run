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
    return;
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
    return;
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
    return;
  } else {
    console.log("三振…… 試合に負けてしまった……");
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

playFirstRound();
