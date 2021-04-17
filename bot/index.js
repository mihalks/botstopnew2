const Discord = require("discord.js");
const botConfig = require("./botConfig.json");
const findNextLesson = require("./utils/findNextLesson.js");
const {parseSchedule, parseScheduleTeacher} = require("./utils/parseSchedule.js");

const discordClient = new Discord.Client();

const commandPrefix = "!";

const getMessage = (lessons, isTeacher) => {
  const nextLesson = findNextLesson(lessons);
  if (nextLesson) {
    return nextLessonMessage = `
      Предмет: ${nextLesson.type} ${nextLesson.subject},
      Дата: ${nextLesson.startsAt.year}.${nextLesson.startsAt.month}.${nextLesson.startsAt.day},
      Время: ${nextLesson.time.start}-${nextLesson.time.end}
      Аудитория: ${nextLesson.audiences[0].name}
      ${isTeacher ? `Группы: ${nextLesson.groups.join(", ")}` : `Преподаватель: ${nextLesson.teachers[0].name}`}
      `;
  } else {
    return "Ближайших пар нет";
  }
}
         
        



discordClient.on("message", async (msg) => {
  if (msg.author.bot) return;

  const channelId = msg.channel.id;
  const channel = discordClient.channels.cache.get(channelId);

  if (msg.content.startsWith(commandPrefix)) {
    const splitted = msg.content.split(" ")
    if (splitted.length === 0){
      channel.send("Пустой текст команды");
      return;
    }
    switch(splitted[0].slice(1)) {
      case 'новая-пара': {
        if (splitted.length > 1){
        const lessons = parseSchedule(splitted[1]);
        const message = getMessage(lessons, false);
        channel.send(message);
      } else {
        channel.send("Неверный формат необходимо указать группу в формате курс-группа, например 1-42");
      }
        break;
      }
      case 'Преподаватель': {
        if (splitted.length > 1){
          const lessons = parseScheduleTeacher(`${splitted[1]} ${splitted[2]}`);
          const message = getMessage(lessons, true);
          channel.send(message); 
        } else {
          channel.send("Неверный формат необходимо указать Фамилия И.О.");
        }
        break;
      }


      case 'gav': {
        if (splitted.length > 1){
          channel.send(`${msg.author.username} ${msg.author.tag}`);
          const n = + splitted[1];
          if (n) {
            for (let i =0 ; i < n; i++){
              channel.send(`Gav`);
            }
            // channel.send(`Мокеволеч лыб ешьнар я`);
            // channel.send(`Меня%;*:№""№"!`);
            // channel.send(`@@@#$Я__:;`);
            // channel.send(`Isuct - lier`);
          }
        } else {
          channel.send(`RRRRRRR`)
        }
        break;
      }
    }
  }
});

discordClient.login(botConfig.token);