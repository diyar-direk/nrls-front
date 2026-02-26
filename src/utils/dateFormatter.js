/**
 * @param {string} date - The date string to format.
 * @param {"justYear"|"fullDate"} [format="justYear"] - The format type.
 * @returns {string} The formatted date.
 */
const dateFormatter = (date, format = "justYear", translate) => {
  const time = new Date(date);

  const year = time.getFullYear();

  const month = String(time.getMonth() + 1).padStart(2, "0");

  const day = String(time.getDate()).padStart(2, "0");

  if (format === "justYear") return `${year}-${month}-${day}`;

  const fullHours = time.getHours();

  const hoursFormat = fullHours > 12 ? fullHours - 12 : fullHours;

  const at = fullHours > 12 ? "PM" : "AM";

  const hours = String(hoursFormat).padStart(2, "0");

  const minutes = String(time.getMinutes()).padStart(2, "0");

  const seconds = String(time.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} / ${hours}:${minutes}:${seconds} ${translate ? translate(`enums.${at}`) : at}`;
};
export default dateFormatter;
