const sliceText = (text, maxLength = 40) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
