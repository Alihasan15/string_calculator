class StringCalculator {
  constructor() {
    this.DEFAULT_DELIMITER = ",";
  }
  add(numbersString) {
    if (numbersString === "") return 0;

    const numbers = this._extractDelimiterAndNumbers(numbersString);
    return numbers.reduce((sum, num) => sum + num, 0);
  }
  _extractDelimiterAndNumbers(numbers) {
    return numbers
      .replace(/\n/g, ",")
      .split(",")
      .map((num) => parseInt(num));
  }
}

module.exports = StringCalculator;
