import fs from "fs";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "users.json");
const GIVEAWAYS_FILE = path.join(process.cwd(), "giveaways.json");

export function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return {};
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8") || "{}");
}

export function saveUsers(data) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

export function loadGiveaways() {
  if (!fs.existsSync(GIVEAWAYS_FILE)) return {};
  return JSON.parse(fs.readFileSync(GIVEAWAYS_FILE, "utf8") || "{}");
}

export function saveGiveaways(data) {
  fs.writeFileSync(GIVEAWAYS_FILE, JSON.stringify(data, null, 2));
}