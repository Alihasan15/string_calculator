class StringCalculator {
  constructor() {
    this.DEFAULT_DELIMITER = ",";
  }
  add(numbersString) {
    if (numbersString === "") return 0;

    const { delimiter, numbers } =
      this._extractDelimiterAndNumbers(numbersString);
    const parsedNumbers = this._parseNumbers(numbers, delimiter);

    return parsedNumbers.reduce((sum, num) => sum + num, 0);
  }

  _extractDelimiterAndNumbers(numbersString) {
    let delimiter = this.DEFAULT_DELIMITER;
    let numbers = numbersString;

    if (numbersString.startsWith("//")) {
      const delimiterEndIndex = numbersString.indexOf("\n");
      delimiter = numbersString.substring(2, delimiterEndIndex);
      numbers = numbersString.substring(delimiterEndIndex + 1);
    }
    return { delimiter, numbers };
  }

  _parseNumbers(numbersString, delimiter) {
    return numbersString
      .replace(/\n/g, delimiter)
      .split(delimiter)
      .map((num) => parseInt(num));
  }
}

module.exports = StringCalculator;
