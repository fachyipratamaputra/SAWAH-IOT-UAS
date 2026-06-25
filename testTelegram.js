require("dotenv").config();

console.log("TOKEN:", process.env.TELEGRAM_BOT_TOKEN);
console.log("CHAT ID:", process.env.TELEGRAM_CHAT_ID);

const sendTelegramMessage =
require("./services/telegramService");

sendTelegramMessage(
`✅ TEST NOTIFIKASI

Server Sawah IoT aktif.

Waktu:
${new Date().toLocaleString("id-ID")}`
);