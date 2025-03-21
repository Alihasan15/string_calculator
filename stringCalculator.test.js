const StringCalculator = require("./stringCalculator");

describe("StringCalculator", () => {
  const calculator = new StringCalculator();

  test("should return 0 for empty string", () => {
    expect(calculator.add("")).toBe(0);
  });
});
