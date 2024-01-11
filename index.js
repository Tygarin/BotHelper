require('dotenv').config();
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const ADMIN_ID = process.env.ADMIN_ID;

const TelegramBot = require("node-telegram-bot-api");
console.log(BOT_TOKEN);
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.on("chat_join_request", (user) => {
  if (user.chat.id === CHANNEL_ID) {
    bot.approveChatJoinRequest(CHANNEL_ID, user.from.id);
    bot.sendMessage(
      ADMIN_ID,
      `В канал ${user.chat.title} по ссылке ${user.invite_link?.name} зашел пользователь ${user.from.first_name}`
    );
  }
  console.log(user);
});
