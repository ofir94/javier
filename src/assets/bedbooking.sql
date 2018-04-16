
CREATE TABLE IF NOT EXISTS reservation (
id_reservation  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
from_date  TEXT,
to_date  TEXT,
cant_adult  INTEGER,
cant_kid  INTEGER,
price  REAL,
deposit  REAL,
comment  TEXT,
id_room  INTEGER,
status  INTEGER,
id_client  INTEGER,

);
