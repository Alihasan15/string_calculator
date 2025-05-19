const StringCalculator = require("./stringCalculator");
const fs = require("fs");

describe("StringCalculator", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
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
  test("should check if the file is created with negative numbers", () => {
    const mockWriteFile = jest.spyOn(fs, "writeFile");
    try {
      calculator.add("-1,-2,3,-4");
    } catch (e) {
      // Expected exception; do nothing
    }
    expect(mockWriteFile).toHaveBeenNthCalledWith(
      1,
      "./negative_numbers.txt",
      "-1,-2,-4",
      expect.anything()
    );
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

  test("should return sum for numbers ignoring any number greater than 1000", () => {
    expect(calculator.add("1,2,3,1003")).toBe(6);
    expect(calculator.add("1,2,3,2000")).toBe(6);
  });

  test("should return sum for numbers ignoring any number greater than 1000 and newline delimiters", () => {
    expect(calculator.add("1\n2\n3,1003")).toBe(6);
    expect(calculator.add("1\n2,3,2000")).toBe(6);
  });

  test("should return sum for numbers ignoring any number greater than 1000 and custom delimiters", () => {
    expect(calculator.add("//;\n1;2;2000")).toBe(3);
    expect(calculator.add("//*\n1*2*3;1002")).toBe(6);
  });
});
