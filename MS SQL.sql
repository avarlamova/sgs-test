CREATE table workers (
workerId INT NOT NULL,
workerName VARCHAR(100) NOT NULL,
factory INT,
city VARCHAR(50)
);

INSERT INTO workers VALUES (1, 'Юрьев', 1, 'Москва');
INSERT INTO workers VALUES (2, 'Петров', 2, 'Москва');
INSERT INTO workers VALUES (3, 'Сидоров', 3, 'Москва');
INSERT INTO workers VALUES (4, 'Романов', 4, 'Санкт-Петербург');
INSERT INTO workers VALUES (5, 'Павлов', 5, 'Санкт-Петербург');
INSERT INTO workers VALUES (6, 'Андреев', 6, 'Санкт-Петербург');
INSERT INTO workers VALUES (7, 'Иванов', 7, 'Челябинск');
INSERT INTO workers VALUES (8, 'Кузнецов', 8, 'Челябинск');
INSERT INTO workers VALUES (9, 'Кошкин', 8, 'Челябинск');
INSERT INTO workers VALUES (10, 'Ульянов', 9, 'Челябинск');
INSERT INTO workers VALUES (11, 'Воронов', 10, 'Омск');
INSERT INTO workers VALUES (12, 'Тихонов', 11, 'Омск');
INSERT INTO workers VALUES (13, 'Никитин', 12, 'Омск');
INSERT INTO workers VALUES (14, 'Попов', 12, 'Омск');