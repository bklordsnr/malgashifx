export const TruncateText = (str: string) => {
  if (str.length < 8) return str;
  return str.substring(0, 8) + "...";
};
