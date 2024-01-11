require("dotenv").config();
const express = require("express");
const app = express();

const port = 3000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const ADMIN_ID = process.env.ADMIN_ID;
const SECOND_ADMIN_ID = process.env.SECOND_ADMIN_ID;

const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(BOT_TOKEN, { polling: true });
console.log(BOT_TOKEN);
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

app.listen(port, () =>
  console.log(`Server running on ${port}, http://localhost:${port}`)
);

app.get("", (req, res) => res.send("Home Page Route"));
