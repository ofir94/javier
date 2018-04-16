
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

CREATE TABLE IF NOT EXISTS reservation_status (
id_status  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
status  TEXT,
color  TEXT,
default  INTEGER
);

INSERT INTO reservation_status VALUES (1, 'Falta de Pago', null, null);
INSERT INTO reservation_status VALUES (2, 'Depósito Pagado', null, null);
INSERT INTO reservation_status VALUES (3, 'Totalmente Pagada', null, null);
INSERT INTO reservation_status VALUES (4, 'Cancelado', null, null);
INSERT INTO reservation_status VALUES (5, 'No disponible', null, null);
