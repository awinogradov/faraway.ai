const TelegramBot = require('node-telegram-bot-api');
const firebase = require('firebase');

const token = '893955766:AAEq1xTBtdftcw8viwCreCWg-PogOFR4SmM';
const bot = new TelegramBot(token, { polling: true });

(async () => {
  await firebase.initializeApp({
    apiKey: 'AIzaSyDneN0WRXt2SpcywVgerp2-HSEo_Dd-qEM',
    authDomain: 'faraway-ai.firebaseapp.com',
    databaseURL: 'https://faraway-ai.firebaseio.com',
  });

  bot.onText(/(.+) билет(.+) (в|на) (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const count = match[1];
    const destination = match[4];

    await firebase.database().ref(`queries/${chatId}`).set({
      count,
      destination,
    });

    bot.sendMessage(chatId, `Count: ${count}. Destination: ${destination}.`);
  });

  bot.onText(/(.+) билет(.+) (в|на) (.+) из (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const count = match[1];
    const destination = match[4];
    const department = match[5];

    bot.sendMessage(chatId, `Count: ${count}. Destination: ${destination}. Departrment: ${department}.`);
  });

  bot.onText(/Билет(.+) (в|на) (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const count = 1;
    const destination = match[4];

    bot.sendMessage(chatId, `Count: ${count}. Destination: ${destination}.`);
  });

  bot.onText(/Билет(.+) (в|на) (.+) из (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const count = 1;
    const destination = match[4];

    bot.sendMessage(chatId, `Count: ${count}. Destination: ${destination}. Departrment: ${department}.`);
  });

  bot.on('message', (msg) => {
    console.log('on message', msg.chat.id);
    // bot.sendMessage(chatId, 'Received your message');
  });
})();
