module.exports = class PitchType {
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
};
