const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("database/festivals.sqlite", err => {
  if (err) console.error("Failed to connect to SQLite:", err);
  else console.log("Connected to SQLite DB");
});

function getAllFestivals() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM festivals;`, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function getFestivalById(festivalId) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM festivals WHERE id = ?;`,
      [festivalId],
      (err, row) => {
        if (err) return reject(err);
        resolve(row || null);
      }
    );
  });
}

function getTicketInventoryByFestivalId(festivalId) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM ticket_inventory WHERE festival_id = ?;`,
      [festivalId],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

module.exports = {
  getAllFestivals,
  getFestivalById,
  getTicketInventoryByFestivalId
};
