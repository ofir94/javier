CREATE TABLE IF NOT EXISTS  celaning_object (id_cleaning_object  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,object  TEXT);

CREATE TABLE IF NOT EXISTS  client (id_client  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,name  TEXT,address  TEXT,address2  TEXT,state  TEXT,postal_code  TEXT,country  TEXT,passport  TEXT,identification  TEXT,phone  TEXT,email  TEXT);

CREATE TABLE IF NOT EXISTS  frequency (id_frequency  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,fixed_day  INTEGER,after_exit  INTEGER,week_day  TEXT,option  INTEGER);

CREATE TABLE IF NOT EXISTS  profile (id_profile  TEXT,name_business  TEXT,country  TEXT,postal_code  TEXT,city  TEXT,street  TEXT,phone  TEXT,email  TEXT,web  TEXT,facebook  TEXT);

CREATE TABLE IF NOT EXISTS  reservation (id_reservation  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,from_date  TEXT,to_date  TEXT,cant_adult  INTEGER,cant_kid  INTEGER,price  REAL,deposit  REAL,comment  TEXT,id_room  INTEGER,status  INTEGER,id_client  INTEGER,CONSTRAINT fkey0 FOREIGN KEY (id_room) REFERENCES room (id_room) ON DELETE CASCADE ON UPDATE CASCADE,CONSTRAINT fkey1 FOREIGN KEY (status) REFERENCES reservation_status (id_status),FOREIGN KEY (id_client) REFERENCES client (id_client));

CREATE TABLE IF NOT EXISTS  reservation_status (id_status  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,status  TEXT,color  TEXT,default  INTEGER);

INSERT INTO reservation_status VALUES (1, 'Falta de Pago', null, null);
INSERT INTO reservation_status VALUES (2, 'Depósito Pagado', null, null);
INSERT INTO reservation_status VALUES (3, 'Totalmente Pagada', null, null);
INSERT INTO reservation_status VALUES (4, 'Cancelado', null, null);
INSERT INTO reservation_status VALUES (5, 'No disponible', null, null);

CREATE TABLE IF NOT EXISTS  room (id_room  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,name  TEXT,cant_people  INTEGER,cant_bed_aditional  INTEGER,cant_bed_single  INTEGER,cant_bed_double  INTEGER,view_order  INTEGER);

CREATE TABLE IF NOT EXISTS sqlite_sequence(name,seq);

INSERT INTO sqlite_sequence VALUES ('room', 1);
INSERT INTO sqlite_sequence VALUES ('reservation', 2);
INSERT INTO sqlite_sequence VALUES ('reservation_status', 5);
