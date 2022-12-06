const PitchType = require("./pitch_type.js");

module.exports = class Pitcher {
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
};
