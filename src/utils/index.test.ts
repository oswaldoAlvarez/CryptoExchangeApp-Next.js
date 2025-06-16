import { formatLargeNumber, formatWithThousands } from "./index";

describe("formatLargeNumber", () => {
  it("should format numbers in trillions (T)", () => {
    expect(formatLargeNumber(1_500_000_000_000)).toBe("1.50T");
    expect(formatLargeNumber(2_000_000_000_000)).toBe("2T");
  });

  it("should format numbers in billions (B)", () => {
    expect(formatLargeNumber(1_500_000_000)).toBe("1.50B");
    expect(formatLargeNumber(2_000_000_000)).toBe("2B");
  });

  it("should format numbers in millions (M)", () => {
    expect(formatLargeNumber(1_500_000)).toBe("1.50M");
    expect(formatLargeNumber(2_000_000)).toBe("2M");
  });

  it("should format numbers below a million with two decimal places", () => {
    expect(formatLargeNumber(1234)).toBe("1234.00");
    expect(formatLargeNumber(1234.56)).toBe("1234.56");
  });
});

describe("formatWithThousands", () => {
  it("should format numbers with thousands separator", () => {
    expect(formatWithThousands(1234567)).toBe("1,234,567");
    expect(formatWithThousands(1234567.89)).toBe("1,234,567.89");
  });

  it("should format strings with thousands separator", () => {
    expect(formatWithThousands("1234567")).toBe("1,234,567");
    expect(formatWithThousands("1234567.89")).toBe("1,234,567.89");
  });

  it("should allow custom thousand separators", () => {
    expect(formatWithThousands(1234567, ".")).toBe("1.234.567");
    expect(formatWithThousands(1234567.89, " ")).toBe("1 234 567.89");
  });

  it("should handle edge cases like empty strings or zero", () => {
    expect(formatWithThousands(0)).toBe("0");
    expect(formatWithThousands("")).toBe("");
  });
});
