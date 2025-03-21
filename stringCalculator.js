class StringCalculator {
  add(numbersString) {
    if (numbersString === "") return 0;

    return parseInt(numbersString);
  }
}

module.exports = StringCalculator;
