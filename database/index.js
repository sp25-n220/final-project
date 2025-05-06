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
function createSchedule(userName, userEmail, startDate, endDate, activities, ticketType, ticketQuantity) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO schedules (userName, userEmail, startDate, endDate, activities, ticketType, ticketQuantity) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [userName, userEmail, startDate, endDate, activities, ticketType, ticketQuantity],
        function (err) {
          if (err) return reject(err);
          resolve({
            id: this.lastID,
            userName,
            userEmail,
            startDate,
            endDate,
            activities,
            ticketType,
            ticketQuantity,
          });
        }
      );
    });
}

// // 3. Update a schedule
// function updateSchedule(scheduleId, userName, userEmail, startDate, endDate, activities, ticketType, ticketQuantity) {
//   return new Promise((resolve, reject) => {
//     db.run(
//       `UPDATE schedules SET user_name = ?, user_email = ?, start_date = ?, end_date = ?, activities = ?, ticket_type = ?, ticket_quantity = ? WHERE id = ?;`,
//       [userName, userEmail, startDate, endDate, activities, ticketType, ticketQuantity, scheduleId],
//     );
//   });
// }

// 4. Delete a schedule
function deleteSchedule(id) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM schedules WHERE id = ?;`, [id], function (err) {
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
  // updateSchedule,
  deleteSchedule,
  
};

