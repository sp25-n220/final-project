-- SQLite
-- Scheduling table
CREATE TABLE IF NOT EXISTS schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    activities TEXT,
    ticket_type TEXT,
    ticket_quantity INTEGER
  
);



-- Inserting a new schedule for Lollapalooza
INSERT INTO schedules (user_name, user_email, start_date, end_date, activities, ticket_type, ticket_quantity)
VALUES
    ('Joseph Roper', 'joseph@gmail.com', '2025-06-15', '2025-06-20', 'Backstage , Concert', 'VIP', 2),
    ('Josh Allen', 'joshy@gmail.com', '2025-06-15', '2025-06-15', 'Backstage, Concert', 'Regular', 1);


SELECT * FROM schedules;
