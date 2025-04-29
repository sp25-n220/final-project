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

// --- SCHEDULES functions ---
// 1. Get all schedules
function getAllSchedules() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM schedules;`, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

// 2. Create a schedule
function createSchedule(festivalId, eventName, startTime, endTime) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO schedules (festival_id, event_name, start_time, end_time) VALUES (?, ?, ?, ?);`,
      [festivalId, eventName, startTime, endTime],
      function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, festivalId, eventName, startTime, endTime });
      }
    );
  });
}

// 3. Update a schedule
function updateSchedule(scheduleId, eventName, startTime, endTime) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE schedules SET event_name = ?, start_time = ?, end_time = ? WHERE id = ?;`,
      [eventName, startTime, endTime, scheduleId],
      function (err) {
        if (err) return reject(err);
        resolve({ updated: this.changes > 0 });
      }
    );
  });
}

// 4. Delete a schedule
function deleteSchedule(scheduleId) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM schedules WHERE id = ?;`, [scheduleId], function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

// --- Export everything ---
module.exports = {
  getAllFestivals,
  getFestivalById,
  getTicketInventoryByFestivalId,
  getAllSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  
};

