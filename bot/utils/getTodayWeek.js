const { DateTime, Interval} = require("luxon");
const isEven = require("./isEven.js");

const getTodayWeek = (today) => {
  const firstPartYear = today.year + (today.month >= 8 ? 0: -1);
  const septemberDate = DateTime.local(firstPartYear, 9, 1);
  const firstWeekStartsAt = septemberDate.startOf('week');
  const diffInDays = Interval.fromDateTimes(firstWeekStartsAt, today).length('days');

  return (isEven(diffInDays / 7) ? 2 : 1);
};

module.exports = getTodayWeek;