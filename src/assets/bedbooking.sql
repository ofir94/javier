
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
INSERT INTO reservation(id_reservation,
                        from_date,
                        to_date,
                        cant_adult,
                        cant_kid,
                        price,
                        deposit,
                        comment,
                        id_room,
                        status,
                        id_client) VALUES (3, '2017-5-5', '2017-5-9', 2, 2, null, null, null, null, 1, null);
