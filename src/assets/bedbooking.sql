

PRAGMA foreign_keys = OFF;

-- ----------------------------
-- Table structure for celaning_object
-- ----------------------------
DROP TABLE IF EXISTS "main"."celaning_object";
CREATE TABLE "celaning_object" (
"id_cleaning_object"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"object"  TEXT
);

-- ----------------------------
-- Records of celaning_object
-- ----------------------------

-- ----------------------------
-- Table structure for client
-- ----------------------------
DROP TABLE IF EXISTS "main"."client";
CREATE TABLE "client" (
"id_client"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"name"  TEXT,
"address"  TEXT,
"address2"  TEXT,
"state"  TEXT,
"postal_code"  TEXT,
"country"  TEXT,
"passport"  TEXT,
"identification"  TEXT,
"phone"  TEXT,
"email"  TEXT
);

-- ----------------------------
-- Records of client
-- ----------------------------

-- ----------------------------
-- Table structure for frequency
-- ----------------------------
DROP TABLE IF EXISTS "main"."frequency";
CREATE TABLE "frequency" (
"id_frequency"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"fixed_day"  INTEGER,
"after_exit"  INTEGER,
"week_day"  TEXT,
"option"  INTEGER
);

-- ----------------------------
-- Records of frequency
-- ----------------------------

-- ----------------------------
-- Table structure for profile
-- ----------------------------
DROP TABLE IF EXISTS "main"."profile";
CREATE TABLE "profile" (
"id_profile"  TEXT,
"name_business"  TEXT,
"country"  TEXT,
"postal_code"  TEXT,
"city"  TEXT,
"street"  TEXT,
"phone"  TEXT,
"email"  TEXT,
"web"  TEXT,
"facebook"  TEXT
);

-- ----------------------------
-- Records of profile
-- ----------------------------

-- ----------------------------
-- Table structure for reservation
-- ----------------------------
DROP TABLE IF EXISTS "main"."reservation";
CREATE TABLE "reservation" (
"id_reservation"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"from_date"  TEXT,
"to_date"  TEXT,
"cant_adult"  INTEGER,
"cant_kid"  INTEGER,
"price"  REAL,
"deposit"  REAL,
"comment"  TEXT,
"id_room"  INTEGER,
"status"  INTEGER,
"id_client"  INTEGER,
CONSTRAINT "fkey0" FOREIGN KEY ("id_room") REFERENCES "room" ("id_room") ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT "fkey1" FOREIGN KEY ("status") REFERENCES "reservation_status" ("id_status"),
FOREIGN KEY ("id_client") REFERENCES "client" ("id_client")
);

-- ----------------------------
-- Records of reservation
-- ----------------------------

-- ----------------------------
-- Table structure for reservation_status
-- ----------------------------
DROP TABLE IF EXISTS "main"."reservation_status";
CREATE TABLE "reservation_status" (
"id_status"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"status"  TEXT,
"color"  TEXT,
"default"  INTEGER
);

-- ----------------------------
-- Records of reservation_status
-- ----------------------------
INSERT INTO "main"."reservation_status" VALUES (1, 'Falta de Pago', null, null);
INSERT INTO "main"."reservation_status" VALUES (2, 'Depósito Pagado', null, null);
INSERT INTO "main"."reservation_status" VALUES (3, 'Totalmente Pagada', null, null);
INSERT INTO "main"."reservation_status" VALUES (4, 'Cancelado', null, null);
INSERT INTO "main"."reservation_status" VALUES (5, 'No disponible', null, null);

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS "main"."room";
CREATE TABLE "room" (
"id_room"  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"name"  TEXT,
"cant_people"  INTEGER,
"cant_bed_aditional"  INTEGER,
"cant_bed_single"  INTEGER,
"cant_bed_double"  INTEGER,
"view_order"  INTEGER
);

-- ----------------------------
-- Records of room
-- ----------------------------

-- ----------------------------
-- Table structure for sqlite_sequence
-- ----------------------------
DROP TABLE IF EXISTS "main"."sqlite_sequence";
CREATE TABLE sqlite_sequence(name,seq);

-- ----------------------------
-- Records of sqlite_sequence
-- ----------------------------
INSERT INTO "main"."sqlite_sequence" VALUES ('room', 1);
INSERT INTO "main"."sqlite_sequence" VALUES ('reservation', 2);
INSERT INTO "main"."sqlite_sequence" VALUES ('reservation_status', 5);
