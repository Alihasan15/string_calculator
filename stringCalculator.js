const fs = require("fs");

class StringCalculator {
  DEFAULT_DELIMITER = ",";
  MAX_NUMBER = 1000;
  NEGATIVE_NUMBER_FILE_PATH = "./negative_numbers.txt";

  add(numbersString) {
    if (numbersString === "") return 0;

    const { delimiter, numbers } =
      this._extractDelimiterAndNumbers(numbersString);
    const parsedNumbers = this._parseNumbers(numbers, delimiter);

    this._validateNoNegativeNumbers(parsedNumbers);

    return parsedNumbers
      .filter((num) => num <= this.MAX_NUMBER)
      .reduce((sum, num) => sum + num, 0);
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

  _validateNoNegativeNumbers(numbers) {
    const negativeNumbers = numbers.filter((num) => num < 0);

    if (negativeNumbers.length > 0) {
      fs.writeFile(
        this.NEGATIVE_NUMBER_FILE_PATH,
        `${negativeNumbers.join(",")}`,
        (err) => {
          if (err) throw err;
        }
      );
      throw new Error(
        `negative numbers not allowed ${negativeNumbers.join(",")}`
      );
    }
  }
}

module.exports = StringCalculator;
