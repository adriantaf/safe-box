const DataBase = require("better-sqlite3");
const { app } = require('electron');
const path = require("path");

const dbPath = path.join(app.getPath('userData'), 'safe-box.db');
const DB = new DataBase(dbPath);

DB.exec(`
  CREATE TABLE IF NOT EXISTS keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    iv TEXT NOT NULL,
    creation_date TEXT NOT NULL,
    update_date TEXT NOT NULL
  )
`);

const tableInfo = DB.prepare(`PRAGMA table_info(keys)`).all();
const existingColumns = tableInfo.map((col) => col.name);
const dateNow = Date.now();
if (!existingColumns.includes('creation_date')) {
  DB.exec(`ALTER TABLE keys ADD COLUMN creation_date TEXT NOT NULL DEFAULT (${dateNow});`);
}

if (!existingColumns.includes('update_date')) {
  DB.exec(`ALTER TABLE keys ADD COLUMN update_date TEXT NOT NULL DEFAULT (${dateNow});`);
}

if (!existingColumns.includes('iv')) {
  DB.exec(`ALTER TABLE keys ADD COLUMN iv TEXT NOT NULL DEFAULT ('undefined');`);
}

module.exports = DB;
