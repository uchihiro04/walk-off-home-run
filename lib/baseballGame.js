const Pitcher = require("./pitcher.js");
const { quiz } = require("enquirer");

module.exports = class BaseballGame {
  constructor() {
    this.pitcher = new Pitcher();
  }

  playFirstRound() {
    console.log("1回戦 9回裏4対3 2アウト1塁 ");
    console.log(
      "監督「相手はストレートに自信を持っているようだ。特徴を頭に入れて打席に立つんだぞ」\n"
    );

    const pitching = this.pitcher.pitchInFirstRound;
    return this.#comeToBat(pitching);
  }

  playSemifinals(highSchool) {
    console.log("監督「よくやった！これで初戦突破だ！」");
    console.log(
      `\nその後も勝利を積み重ねた${highSchool}高校は、準決勝まで勝ち上がった……`
    );
    console.log("\n準決勝 9回裏8対6 2アウト1、2塁 ");
    console.log(
      "監督「相手は2種類の落ちる球を武器にしているようだ。特徴を頭に入れて打席に立つんだぞ」\n"
    );

    const pitching = this.pitcher.pitchInSemifinals;
    return this.#comeToBat(pitching);
  }

  playFinal(highSchool) {
    console.log("監督「よくやった！これで決勝進出だ！」");
    console.log(
      `\n快進撃を続ける${highSchool}高校は、ついに決勝まで勝ち上がった……`
    );
    console.log("\n決勝 9回裏3対0 2アウト満塁 ");
    console.log(
      "監督「相手は直球とスピードのある変化球を織り交ぜてくるようだ。特徴を頭に入れて打席に立つんだぞ」\n"
    );

    const pitching = this.pitcher.pitchInFinal;
    return this.#comeToBat(pitching);
  }

  async #comeToBat(pitching) {
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
};