exports.pitchInFirstRound = () => {
  return {
    name: "varieyOfPitches",
    message: "相手はこの球を投げてくるはず！",
    choices: ["ストレート", "カーブ", "フォーク"],
    correctChoice: selectPitchTypeForFirstRound(),
  };
};

exports.pitchInSemifinals = () => {
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
    correctChoice: selectPitchTypeForSemifinals(),
  };
};

exports.pitchInFinal = () => {
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
    correctChoice: selectPitchTypeForFinal(),
  };
};

function selectPitchTypeForFirstRound() {
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

function selectPitchTypeForSemifinals() {
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

function selectPitchTypeForFinal() {
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
