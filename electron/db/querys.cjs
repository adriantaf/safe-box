const { encryptPassword, decryptPassword } = require("../crypt/crypto_password.cjs");
const DB = require("./database.cjs");

async function insert(plaform, username, password, creationDate) {
  const { iv, encryptedPassword } = encryptPassword(password);
  const statement = DB.prepare('INSERT INTO keys (platform, username, password, iv, creation_date, update_date) VALUES (?, ?, ?, ?, ?, ?)');
  statement.run(plaform, username, encryptedPassword, iv, creationDate, creationDate);
}

function selectAll() {
  const statement = DB.prepare('SELECT * FROM keys');
  let response = statement.all();
  let repeatQuery = false;


  // En caso de tener una version anterior:
  response.forEach((row) => {
    if (!row.iv || row.iv === 'undefined') {
      updatePassword(row.id, row.password);
      repeatQuery = true;
    }
  });

  if (repeatQuery === true) {
    response = statement.all();
  }

  const dataDecrypted = response.map((row) => {
    return {
      ...row,
      password: decryptPassword({ iv: row.iv, encryptedPassword: row.password }),
    };
  });

  return dataDecrypted;
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

async function updatePassword(id, newValue) {
  const { iv, encryptedPassword } = encryptPassword(newValue);
  const statement = DB.prepare('UPDATE keys SET password = ?, iv = ? WHERE id = ?');
  statement.run(encryptedPassword, iv, id);
}

function updateDate(id, newValue) {
  const statement = DB.prepare('UPDATE keys SET update_date = ? WHERE id = ?');
  statement.run(newValue, id);
}

module.exports = {
  insert,
  selectAll,
  remove,
  updatePlatform,
  updateUsername,
  updatePassword,
  updateDate
};