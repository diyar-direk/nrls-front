/**
 *
 * @param {number} size
 * @returns {string}
 */
export const formatSizeFromKB = (size) => {
  if (!size || size <= 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];
  let index = 0;

  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }

  return `${size.toFixed(2)} ${units[index]}`;
};
