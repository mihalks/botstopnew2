const compressIntoGroups = require("./compressIntoGroups.js");
const schedule = require("../data/schedule.json");

const parseSchedule = (group) => {
  b = schedule.faculties.filter(i => i.name === "Факультет ТУ и ЦИ")[0];
  return b.groups.filter(i => i.name === group)[0].lessons;
}


const parseScheduleTeacher = (teacherName, compressedIntoGroups = true) => {
  const lessons = [];
  
  for (const faculty of schedule.faculties) {
    for (const group of faculty.groups) {
      const targetLessons = group.lessons.filter(lesson => {
        return !!lesson.teachers.find(teacher => {
          return teacher.name === teacherName;
        });
      });

      targetLessons.forEach(lesson => {
        // fix week: in api they are messed up
        lesson.date.week = lesson.date.week === 1 ? 2 : 1;

        lesson.group = group.name;
      });
      
      lessons.push(...targetLessons);
    }
  }

  if (compressedIntoGroups) {
    return compressIntoGroups(lessons);
  }

  return lessons;
};

module.exports = {parseSchedule, parseScheduleTeacher};