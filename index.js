import { useState } from "react";

export default function Home() {
  const [botToken, setBotToken] = useState("");
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);

  async function register() {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ botToken })
    });
    const data = await res.json();
    setMessages([data.message]);
  }

  async function addGiveaway() {
    const res = await fetch("/api/addGiveaway", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ botToken, code })
    });
    const data = await res.json();
    setMessages([data.message]);
    setCode("");
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>Telegram Giveaway Bot</h1>

      <label>Bot Token:</label>
      <input value={botToken} onChange={e => setBotToken(e.target.value)} style={{ width: "100%", padding: 8 }} />

      <div style={{ marginTop: 10 }}>
        <button onClick={register} style={{ padding: "8px 12px" }}>Register Bot</button>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <label>Giveaway Code / Link:</label>
      <input value={code} onChange={e => setCode(e.target.value)} style={{ width: "100%", padding: 8 }} />
      <div style={{ marginTop: 10 }}>
        <button onClick={addGiveaway} style={{ padding: "8px 12px" }}>Add Giveaway</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>Messages:</h4>
        {messages.map((m, i) => <div key={i} style={{ padding: 8, border: "1px solid #ddd", marginBottom: 4 }}>{m}</div>)}
      </div>
    </div>
  );
}