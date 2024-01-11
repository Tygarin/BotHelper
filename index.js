require("dotenv").config();
const http = require("http");

const server = http.createServer((_, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello world!");
});

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const ADMIN_ID = process.env.ADMIN_ID;
const SECOND_ADMIN_ID = process.env.SECOND_ADMIN_ID;

const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.on("chat_join_request", (user) => {
  if (user.chat.id === Number(CHANNEL_ID)) {
    bot.approveChatJoinRequest(Number(CHANNEL_ID), user.from.id);
    bot.sendMessage(
      user.from.id,
      `Спасибо, что подписались на наш канал! Обещаем радовать вас качественным контентом!`
    );
    bot.sendMessage(
      Number(ADMIN_ID),
      `В канал ${user.chat.title} по ссылке ${user.invite_link?.name} зашел пользователь ${user.from.first_name}`
    );
    bot.sendMessage(
      Number(SECOND_ADMIN_ID),
      `В канал ${user.chat.title} по ссылке ${user.invite_link?.name} зашел пользователь ${user.from.first_name}`
    );
  }
});

server.listen(3000, () => console.log("Server is running on port 3000"));
