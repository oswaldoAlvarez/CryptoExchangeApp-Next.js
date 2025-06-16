interface IFormatChangePercent {
  text: string;
  className: string;
}

export const useFormatChangePercent = (
  value: number,
  decimals = 2
): IFormatChangePercent => {
  const factor = Math.pow(10, decimals);
  const rounded = Math.round(value * factor) / factor;

  const sign = rounded > 0 ? "+" : "";
  const text = `${sign}${rounded.toFixed(decimals)}%`;

  let className: string;

  if (rounded > 0) className = "text-green-500";
  else if (rounded < 0) className = "text-red-500";
  else className = "text-gray-500";

  return { text, className };
};
