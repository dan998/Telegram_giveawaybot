import { loadUsers, loadGiveaways, saveGiveaways } from "../../../lib/storage";
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  const { userId } = req.query;

  const users = loadUsers();
  const giveaways = loadGiveaways();
  const user = users[userId];
  if (!user) return res.status(404).send("Bot not found");

  const body = req.body;
  const message = body.message || body.edited_message;
  if (!message) return res.status(200).send("No message");

  const chatId = message.chat.id;
  const text = (message.text || "").trim();

  if (text === "/getgift" || text === "/start") {
    const userGiveaways = giveaways[userId] || [];
    const next = userGiveaways.find(g => !g.consumed);
    if (!next) {
      await sendMessage(user.botToken, chatId, "No giveaways available right now.");
      return res.status(200).send("No giveaways");
    }

    next.consumed = true;
    saveGiveaways(giveaways);

    await sendMessage(user.botToken, chatId, `🎁 Your Gift:\n\n${next.code}`);
    return res.status(200).send("Sent");
  } else {
    await sendMessage(user.botToken, chatId, "Send /getgift to receive a giveaway code.");
    return res.status(200).send("OK");
  }
}

async function sendMessage(botToken, chatId, text) {
  return fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}