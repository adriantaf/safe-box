const DB = require("./database.cjs");

function insert(plaform, username, password, creationDate) {
  const statement = DB.prepare('INSERT INTO keys (platform, username, password, creation_date, update_date) VALUES (?, ?, ?, ?, ?)');
  statement.run(plaform, username, password, creationDate, creationDate);
}

function selectAll() {
  const statement = DB.prepare('SELECT * FROM keys');
  return statement.all();
}

function select(id) {
  const statement = DB.prepare('SELECT * FROM keys WHERE id = ?');
  return statement.get(id);
}

function remove(id) {
  const statement = DB.prepare('DELETE FROM keys WHERE id = ?');
  statement.run(id);
}

function updatePlatform(id, newValue) {
  const statement = DB.prepare('UPDATE keys SET platform = ? WHERE id = ?');
  statement.run(newValue, id);
}

function updateUsername(id, newValue) {
  const statement = DB.prepare('UPDATE keys SET username = ? WHERE id = ?');
  statement.run(newValue, id);
}

function updatePassword(id, newValue) {
  const statement = DB.prepare('UPDATE keys SET password = ? WHERE id = ?');
  statement.run(newValue, id);
}

function updateDate(id, newValue) {
  const statement = DB.prepare('UPDATE keys SET update_date = ? WHERE id = ?');
  statement.run(newValue, id);
}

module.exports = {
  insert,
  selectAll, 
  select,
  remove,
  updatePlatform,
  updateUsername,
  updatePassword,
  updateDate
};
