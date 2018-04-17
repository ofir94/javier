CREATE TABLE IF NOT EXISTS cleaning_object (id_cleaning_object  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,object  TEXT);

CREATE TABLE IF NOT EXISTS  client (id_client  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,name  TEXT,address  TEXT,address2  TEXT,state  TEXT,postal_code  TEXT,country  TEXT,passport  TEXT,identification  TEXT,phone  TEXT,email  TEXT);

CREATE TABLE IF NOT EXISTS  frequency (id_frequency  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,fixed_day  INTEGER,after_exit  INTEGER,week_day  TEXT,option  INTEGER);

CREATE TABLE IF NOT EXISTS  profile (id_profile  TEXT,name_business  TEXT,country  TEXT,postal_code  TEXT,city  TEXT,street  TEXT,phone  TEXT,email  TEXT,web  TEXT,facebook  TEXT);

CREATE TABLE IF NOT EXISTS  reservation (id_reservation  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,from_date  TEXT,to_date  TEXT,cant_adult  INTEGER,cant_kid  INTEGER,price  REAL,deposit  REAL,comment  TEXT,id_room  INTEGER,status  INTEGER,id_client  INTEGER,CONSTRAINT fkey0 FOREIGN KEY (id_room) REFERENCES room (id_room) ON DELETE CASCADE ON UPDATE CASCADE,CONSTRAINT fkey1 FOREIGN KEY (status) REFERENCES reservation_status (id_status),FOREIGN KEY (id_client) REFERENCES client (id_client));

CREATE TABLE IF NOT EXISTS  reservation_status (id_status  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,status  TEXT,color  TEXT);

INSERT INTO reservation_status (id_status,status,color) VALUES (1, 'Falta de Pago', null);
INSERT INTO reservation_status (id_status,status,color) VALUES (2, 'Depósito Pagado', null);
INSERT INTO reservation_status (id_status,status,color) VALUES (3, 'Totalmente Pagada', null);
INSERT INTO reservation_status (id_status,status,color) VALUES (4, 'Cancelado', null);
INSERT INTO reservation_status (id_status,status,color) VALUES (5, 'No disponible', null);

CREATE TABLE IF NOT EXISTS  room (id_room  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,name  TEXT,cant_people  INTEGER,cant_bed_aditional  INTEGER,cant_bed_single  INTEGER,cant_bed_double  INTEGER,view_order  INTEGER);

