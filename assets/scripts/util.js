export const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

// transforms "YYYY-MM-DD" to "Day of Month, Year"
export const prettyDate = function(unicodeDate) {
  let p = unicodeDate.split('-').map(i => parseInt(i));
  return `${p[2]} ${months[p[1] - 1]}, ${p[0]}`;
};

const util = { prettyDate };

export default util;
