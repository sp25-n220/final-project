-- SQLite
pragma foreign_keys = on;

create table festivals (
  id integer primary key autoincrement,
  name text not null,
  location text,
  start_date date,
  description text,
  image_url text,
  website_link text
);

create table if not exists ticket_inventory (
  inventory_id integer primary key,
  festival_id  integer not null,
  ticket_type  text    not null,
  price        decimal(10,2),
  qty_available integer,
  foreign key(festival_id) references festivals(id)
);

insert into festivals
  (name, location, start_date, description, image_url, website_link)
values
  (
    'Lollapalooza',
    'Chicago, IL',
    '2025-07-31',
    '4 days of the world’s best music under the iconic Chicago skyline.',
    '/img/festivals/lollapalooza.png',
    'https://www.lollapalooza.com/'
  ),
    (
    'Bonnaroo',
    'Manchester, TN',
    '2025-06-12',
    'Bonnaroo is a magical world of music, fun, & friendship held each June on our 700-acre farm in Manchester, TN.',
    '/img/festivals/bonnaroo.png',
    'https://www.bonnaroo.com/'
  ),
  (
    'Shaky Knees',
    'Atlanta, GA',
    '2025-09-19',
    'With more than 60 bands each year Shaky Knees is a rock-lover’s dream. Since its inception in 2013, Shaky Knees has featured a diverse lineup ranging from world-renowned acts to up-and-coming artists.',
    '/img/festivals/shaky_knees.png',
    'https://www.shakykneesfestival.com/'
  );

-- Lollapalooza
INSERT INTO ticket_inventory (festival_id, ticket_type, price, qty_available)
  VALUES (1, '1-day', 100.00, 500);
INSERT INTO ticket_inventory (festival_id, ticket_type, price, qty_available)
  VALUES (1, '3-day', 250.00, 200);
INSERT INTO ticket_inventory (festival_id, ticket_type, price, qty_available)
  VALUES (1, 'VIP',   500.00,  50);

-- Bonnaroo
INSERT INTO ticket_inventory (festival_id, ticket_type, price, qty_available)
  VALUES (2, '1-day',  90.00, 600);
INSERT INTO ticket_inventory (festival_id, ticket_type, price, qty_available)
  VALUES (2, '3-day', 220.00, 250);
INSERT INTO ticket_inventory (festival_id, ticket_type, price, qty_available)
  VALUES (2, 'VIP',   450.00,  60);

-- Shaky Knees
INSERT INTO ticket_inventory (festival_id, ticket_type, price, qty_available)
  VALUES (3, '1-day', 120.00, 400);
INSERT INTO ticket_inventory (festival_id, ticket_type, price, qty_available)
  VALUES (3, '3-day', 300.00, 150);
INSERT INTO ticket_inventory (festival_id, ticket_type, price, qty_available)
  VALUES (3, 'VIP',   600.00,  40);

select * from festivals;
select * from ticket_inventory;



-- Scheduling table
CREATE TABLE IF NOT EXISTS schedules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  festival_id INTEGER NOT NULL,
  event_name TEXT NOT NULL,
  start_time DATETIME,
  end_time DATETIME,
  FOREIGN KEY(festival_id) REFERENCES festivals(id)
);



-- Inserting a new schedule for Lollapalooza
INSERT INTO schedules (festival_id, event_name, start_time, end_time)
VALUES (1, 'Opening Act', '2025-07-31 14:00:00', '2025-07-31 16:00:00');

-- Inserting a new schedule for Bonnaroo
INSERT INTO schedules (festival_id, event_name, start_time, end_time)
VALUES (2, 'Main Stage Performance', '2025-06-12 18:00:00', '2025-06-12 20:00:00');

-- Inserting a new schedule for Shaky Knees
INSERT INTO schedules (festival_id, event_name, start_time, end_time)
VALUES (3, 'Late Night Show', '2025-09-19 22:00:00', '2025-09-20 00:00:00')


SELECT * FROM schedules;

SELECT * FROM schedules WHERE festival_id = ?;

UPDATE schedules
SET event_name = ?, start_time = ?, end_time = ?
WHERE id = ?;

DELETE FROM schedules WHERE id = ?;