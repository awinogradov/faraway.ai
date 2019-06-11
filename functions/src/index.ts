// https://firebase.google.com/docs/functions/typescript
// bot 893955766:AAEq1xTBtdftcw8viwCreCWg-PogOFR4SmM
// firebase AIzaSyDneN0WRXt2SpcywVgerp2-HSEo_Dd-qEM

import firebase from 'firebase';
import { config, https, Response, Request } from 'firebase-functions';
import TelegramBot, { Message } from 'node-telegram-bot-api';

type Match = RegExpExecArray | null;
interface Settings {
  passengers?: number;
}

const conf = config();
const appId = 'faraway-ai';
const bot = new TelegramBot(conf.bot.token);

bot.setWebHook(`https://us-central1-${appId}.cloudfunctions.net/hook`);

firebase.initializeApp({
  apiKey: conf.bot.firebase,
  authDomain: `${appId}.firebaseapp.com`,
  databaseURL: `https://${appId}.firebaseio.com`,
});

const database = firebase.database();

enum searchKind {
  weekend = 'weekend'
}

/**
 * Setup default passengers number.
 */
bot.onText(/(.+) билет/, async (msg: Message, match: Match) => {
  if (!match) return;

  const { username, id: chat } = msg.chat;
  const passengers = Number(match[1]);

  if (isNaN(passengers)) {
    bot.sendMessage(chat, 'Кол-во пассажиров должно быть числом. 1 или 2 например ;)');
  }

  await database.ref(`settings/${username}`).set({ passengers });

  bot.sendMessage(chat, `Супер! Кол-во пассажиров по умолчанию ${passengers}`);
});

bot.onText(/(В|На) (.+) на выходные/, async (msg: Message, match: Match) => {
  if (!match) return;

  const { username, id: chat } = msg.chat;
  const to = match[1].toLowerCase();
  const destination = match[2];
  const { passengers } = await database.ref(`settings/${username}`).toJSON() as Settings;

  await database.ref(`queries/${destination}`).set({
    mode: searchKind.weekend,
    username: { [username!]: true }
  });

  bot.sendMessage(chat, `Полетели ${to} ${destination}! Ищу билет для ${passengers} человек.`);
});

  // bot.onText(/(.+) билет(.+) (в|на) (.+) из (.+)/, (msg, match) => {
  //   const chatId = msg.chat.id;
  //   const count = match[1];
  //   const destination = match[4];
  //   const department = match[5];

  //   bot.sendMessage(chatId, `Count: ${count}. Destination: ${destination}. Departrment: ${department}.`);
  // });

  // bot.onText(/Билет(.+) (в|на) (.+)/, (msg, match) => {
  //   const chatId = msg.chat.id;
  //   const count = 1;
  //   const destination = match[4];

  //   bot.sendMessage(chatId, `Count: ${count}. Destination: ${destination}.`);
  // });

  // bot.onText(/Билет(.+) (в|на) (.+) из (.+)/, (msg, match) => {
  //   const chatId = msg.chat.id;
  //   const count = 1;
  //   const destination = match[4];

  //   bot.sendMessage(chatId, `Count: ${count}. Destination: ${destination}. Departrment: ${department}.`);
  // });

  // bot.on('message', (msg) => {
    // console.log('on message', msg.chat.id);
    // bot.sendMessage(chatId, 'Received your message');
  // });

export const hook = https.onRequest((req: Request, res: Response) => {
  bot.processUpdate(req.body);
  res.end();
});

export const health = https.onRequest((_: Request, res: Response) => res.send('ok'));
