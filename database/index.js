const sqlite = require("sqlite3").verbose();

const db = new sqlite.Database("database/festivals.sqlite", function (err) {
  if (err) console.log("Failed Connect: Festivals SQLite Database");
  else console.log("Successful Connect: Festivals SQLite Database");
});

async function getAllGemCharacters() {
  return new Promise((resolve, reject) => {
    db.all(`select * from gemCharacters;`, function (err, rows) {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function getSavedGemsByUserId(userId) {
  return new Promise(function (resolve, reject) {
    if (!userId) reject("No userId");
    db.all(
      `
select
    usg.savedGemId,
    gc.name
from userSavedGems usg
left join gemCharacters gc
    on usg.gemId = gc.gemId
where usg.userId = ${userId};`,
      function (err, rows) {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

async function addNewGem(gemData = {}) {
  return new Promise((resolve, reject) => {
    if (!gemData.name) reject("Name is required for new gems");
    db.run(
      `insert into gemCharacters (name) values ('${gemData.name}');
      select * from gemCharacters;`,
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

module.exports = {
  getAllGemCharacters,
  getSavedGemsByUserId,
  addNewGem,
};
