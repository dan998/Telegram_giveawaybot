import { loadUsers, loadGiveaways, saveGiveaways } from "../../lib/storage";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
  const { botToken, code } = req.body;
  if (!botToken || !code) return res.status(400).json({ message: "Bot token and code required" });

  const users = loadUsers();
  const userId = botToken.slice(0, 10);
  if (!users[userId]) return res.status(404).json({ message: "Bot not registered" });

  const giveaways = loadGiveaways();
  giveaways[userId] = giveaways[userId] || [];
  giveaways[userId].push({ code, consumed: false });
  saveGiveaways(giveaways);

  res.json({ message: "Giveaway code added successfully!" });
}