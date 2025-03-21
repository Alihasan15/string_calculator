const StringCalculator = require("./stringCalculator");

describe("StringCalculator", () => {
  const calculator = new StringCalculator();

  test("should return 0 for empty string", () => {
    expect(calculator.add("")).toBe(0);
  });

  test("should return the number for a single number string", () => {
    expect(calculator.add("1")).toBe(1);
  });
});
