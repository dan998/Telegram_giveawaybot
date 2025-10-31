import { loadUsers, saveUsers } from "../../lib/storage";
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
  const { botToken } = req.body;
  if (!botToken) return res.status(400).json({ message: "Bot token required" });

  const users = loadUsers();
  const userId = botToken.slice(0, 10); // simple unique id
  users[userId] = { botToken };
  saveUsers(users);

  // Auto-set webhook
  const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook/${userId}`;
  try {
    const resp = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: webhookUrl })
    });
    const data = await resp.json();
    if (!data.ok) {
      return res.status(500).json({ message: `Failed to set webhook: ${data.description}` });
    }
  } catch (err) {
    return res.status(500).json({ message: "Failed to set webhook: " + err.message });
  }

  res.json({ message: `Bot registered and webhook set successfully! User ID: ${userId}` });
}