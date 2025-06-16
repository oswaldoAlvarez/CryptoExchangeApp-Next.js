export const formatLargeNumber = (n: number): string => {
  if (Math.abs(n) >= 1_000_000_000_000) {
    return (n / 1_000_000_000_000).toFixed(2).replace(/\.00$/, "") + "T";
  }
  if (Math.abs(n) >= 1_000_000_000) {
    return (n / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "B";
  }
  if (Math.abs(n) >= 1_000_000) {
    return (n / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
  }

  return n.toFixed(2);
};

export const formatWithThousands = (
  value: number | string,
  thousandSeparator = ","
): string => {
  const [integerPart, decimalPart] = value.toString().split(".");

  const intWithSep = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandSeparator
  );

  return decimalPart !== undefined
    ? `${intWithSep}.${decimalPart}`
    : intWithSep;
};
