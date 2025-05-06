-- SQLite
-- Scheduling table
DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userName TEXT NOT NULL,
    userEmail TEXT ,
    startDate TEXT ,
    endDate TEXT,
    activities TEXT,
    ticketType TEXT,
    ticketQuantity INTEGER
  
);



-- Inserting a new schedule for Lollapalooza
INSERT INTO schedules (userName, userEmail, startDate, endDate, activities, ticketType, ticketQuantity)
VALUES
    ('Joseph Roper', 'joseph@gmail.com', '2025-06-15', '2025-06-20', 'Backstage , Concert', 'VIP', 2),
    ('Josh Allen', 'joshy@gmail.com', '2025-06-15', '2025-06-15', 'Backstage, Concert', 'Regular', 1);


SELECT * FROM schedules;
