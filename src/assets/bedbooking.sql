DROP TABLE IF EXISTS "celaning_object";
CREATE TABLE "celaning_object" ("id_cleaning_object"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"object"  TEXT);

DROP TABLE IF EXISTS "client";
CREATE TABLE "client" ("id_client"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"name"  TEXT,"address"  TEXT,"address2"  TEXT,"state"  TEXT,"postal_code"  TEXT,"country"  TEXT,"passport"  TEXT,"identification"  TEXT,"phone"  TEXT,"email"  TEXT);

DROP TABLE IF EXISTS "frequency";
CREATE TABLE "frequency" ("id_frequency"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"fixed_day"  INTEGER,"after_exit"  INTEGER,"week_day"  TEXT,"option"  INTEGER);

DROP TABLE IF EXISTS "profile";
CREATE TABLE "profile" ("id_profile"  TEXT,"name_business"  TEXT,"country"  TEXT,"postal_code"  TEXT,"city"  TEXT,"street"  TEXT,"phone"  TEXT,"email"  TEXT,"web"  TEXT,"facebook"  TEXT);

DROP TABLE IF EXISTS "reservation";
CREATE TABLE "reservation" ("id_reservation"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"from_date"  TEXT,"to_date"  TEXT,"cant_adult"  INTEGER,"cant_kid"  INTEGER,"price"  REAL,"deposit"  REAL,"comment"  TEXT,"id_room"  INTEGER,"status"  INTEGER,"id_client"  INTEGER,CONSTRAINT "fkey0" FOREIGN KEY ("id_room") REFERENCES "room" ("id_room") ON DELETE CASCADE ON UPDATE CASCADE,CONSTRAINT "fkey1" FOREIGN KEY ("status") REFERENCES "reservation_status" ("id_status"),FOREIGN KEY ("id_client") REFERENCES "client" ("id_client"));

DROP TABLE IF EXISTS "reservation_status";
CREATE TABLE "reservation_status" ("id_status"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"status"  TEXT,"color"  TEXT,"default"  INTEGER);

INSERT INTO "reservation_status" VALUES (1, 'Falta de Pago', null, null);
INSERT INTO "reservation_status" VALUES (2, 'Depósito Pagado', null, null);
INSERT INTO "reservation_status" VALUES (3, 'Totalmente Pagada', null, null);
INSERT INTO "reservation_status" VALUES (4, 'Cancelado', null, null);
INSERT INTO "reservation_status" VALUES (5, 'No disponible', null, null);

DROP TABLE IF EXISTS "room";
CREATE TABLE "room" ("id_room"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"name"  TEXT,"cant_people"  INTEGER,"cant_bed_aditional"  INTEGER,"cant_bed_single"  INTEGER,"cant_bed_double"  INTEGER,"view_order"  INTEGER);

DROP TABLE IF EXISTS "sqlite_sequence";
CREATE TABLE sqlite_sequence(name,seq);

INSERT INTO "sqlite_sequence" VALUES ('room', 1);
INSERT INTO "sqlite_sequence" VALUES ('reservation', 2);
INSERT INTO "sqlite_sequence" VALUES ('reservation_status', 5);
