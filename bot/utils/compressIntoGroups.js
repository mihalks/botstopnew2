const compressIntoGroups = (lessons) => {
  const compressedLessons = [];
  
  for (const lesson of lessons) {
    const sameLesson = compressedLessons.find(compressedLesson => {
      if (
        compressedLesson.date.week === lesson.date.week &&
        compressedLesson.date.weekday === lesson.date.weekday &&
        compressedLesson.time.start === lesson.time.start &&
        compressedLesson.time.end === lesson.time.end
      ) {
        return true;
      }
    });


    if (sameLesson) {
      sameLesson.groups.push(lesson.group);
    } else {
      const newCompressedLesson = {...lesson};

      newCompressedLesson.groups = [newCompressedLesson.group];
      delete newCompressedLesson.group;
      
      compressedLessons.push(newCompressedLesson);
    }
  }

  return compressedLessons;
};

module.exports = compressIntoGroups;