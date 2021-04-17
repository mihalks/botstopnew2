
const getTodayWeek = require("./getTodayWeek.js");
const { DateTime, Interval} = require("luxon");

const findNextLesson = (lessons) => {
  
  const today = DateTime.local();
  const todayWeek = getTodayWeek(today);
  const startOfWeek = today.startOf('week')
  let nextLesson = null;

  console.log(lessons);

  for (let lesson of lessons) {
    const splittedTime = lesson.time.start.split(":");
    
    const startLimit = DateTime.fromISO(
      lesson.date.start.split(".").reverse().join("-")
    );

    const endLimit = DateTime.fromISO(
      lesson.date.end.split(".").reverse().join("-")
    ).plus({day: 1}); // plus day if we want to include end data in interval
    
    let startsAt = startOfWeek.plus({
      day: lesson.date.weekday - 1,
      hour: splittedTime[0],
      minute: splittedTime[1],
      second: splittedTime[2]
    });
  
    if (lesson.date.week !== todayWeek) {
      startsAt = startsAt.plus({day: 7});
    }

    if (startsAt < today) {
      startsAt = startsAt.plus({day: 14});
    }

    if (startsAt < startLimit || startsAt > endLimit) {
      continue;
    }

    lesson.startsAt = startsAt;

    if (!nextLesson || nextLesson.startsAt > lesson.startsAt) {
      nextLesson = lesson;
    }
  }

  return nextLesson;
};

module.exports = findNextLesson;