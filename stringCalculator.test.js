const StringCalculator = require("./stringCalculator");

describe("StringCalculator", () => {
  const calculator = new StringCalculator();

  test("should return 0 for empty string", () => {
    expect(calculator.add("")).toBe(0);
  });

  test("should return the number for a single number string", () => {
    expect(calculator.add("1")).toBe(1);
  });

  test("should return the sum for two comma-separated numbers", () => {
    expect(calculator.add("1,5")).toBe(6);
  });

  test("should return the sum for multiple comma-separated numbers", () => {
    expect(calculator.add("1,2,3,4")).toBe(10);
  });

  test("should handle new lines between numbers", () => {
    expect(calculator.add("1\n2,3")).toBe(6);
  });

  test("should support custom delimiter specified at the beginning", () => {
    expect(calculator.add("//;\n1;2")).toBe(3);
  });

  test("should throw an exception for negative numbers", () => {
    expect(() => calculator.add("-1,2")).toThrow(
      "negative numbers not allowed -1"
    );
  });

  test("should include all negative numbers in the exception message", () => {
    expect(() => calculator.add("-1,-2,3,-4")).toThrow(
      "negative numbers not allowed -1,-2,-4"
    );
  });
});
