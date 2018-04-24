CREATE TABLE IF NOT EXISTS cleaning_object (id_cleaning_object  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,object  TEXT);

INSERT INTO cleaning_object (id_cleaning_object,object) VALUES (1, 'Toallas');
INSERT INTO cleaning_object (id_cleaning_object,object) VALUES (2, 'Ropa de Cama');
INSERT INTO cleaning_object (id_cleaning_object,object) VALUES (3, 'Limpieza');

CREATE TABLE IF NOT EXISTS  frequency (id_frequency  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,fixed_day  INTEGER,after_exit  INTEGER,week_day  TEXT,selected_option INTEGER, id_cleaning_object  INTEGER);

INSERT INTO frequency (id_frequency,fixed_day,after_exit,week_day ,selected_option, id_cleaning_object) VALUES (1,0, 1,"Lunes,Martes,Miercoles,Jueves,Viernes,Sabado,Domingo",2,1);
INSERT INTO frequency (id_frequency,fixed_day,after_exit,week_day,selected_option, id_cleaning_object) VALUES (2,0, 1,"Lunes,Martes,Miercoles,Jueves,Viernes,Sabado,Domingo",2,2);
INSERT INTO frequency (id_frequency,fixed_day,after_exit,week_day,selected_option, id_cleaning_object) VALUES (3,0, 1,"Lunes,Martes,Miercoles,Jueves,Viernes,Sabado,Domingo",2,3);


CREATE TABLE IF NOT EXISTS  client (id_client  TEXT,name  TEXT,address  TEXT,address2  TEXT,state  TEXT,postal_code  TEXT,country  TEXT,passport  TEXT,identification  TEXT,phone  TEXT,email  TEXT);

CREATE TABLE IF NOT EXISTS  profile (id_profile  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,name_business  TEXT,country  TEXT,postal_code  TEXT,city  TEXT,street  TEXT,phone  TEXT,email  TEXT,web  TEXT,facebook  TEXT);

INSERT INTO profile (id_profile,name_business,country,postal_code,city,street,phone,email,web,facebook) VALUES (1,'','','','','','','','','');

CREATE TABLE IF NOT EXISTS  room (id_room  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,name  TEXT,cant_people  INTEGER,cant_bed_aditional  INTEGER,cant_bed_single  INTEGER,cant_bed_double  INTEGER,view_order  INTEGER, price REAL);

CREATE TABLE IF NOT EXISTS  reservation_status (id_status  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,status  TEXT,color  TEXT);

CREATE TABLE IF NOT EXISTS  reservation (id_reservation  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,from_date  TEXT,to_date  TEXT,cant_adult  INTEGER,cant_kid  INTEGER,price  REAL,deposit  REAL,comment  TEXT,cant_bed_single INTEGER, cant_bed_double INTEGER,id_room  INTEGER,status  INTEGER,id_client  TEXT);

INSERT INTO reservation_status (id_status,status,color) VALUES (1, 'Falta de Pago', null);
INSERT INTO reservation_status (id_status,status,color) VALUES (2, 'Depósito Pagado', null);
INSERT INTO reservation_status (id_status,status,color) VALUES (3, 'Totalmente Pagada', null);
INSERT INTO reservation_status (id_status,status,color) VALUES (4, 'Cancelado', null);
INSERT INTO reservation_status (id_status,status,color) VALUES (5, 'No disponible', null);


