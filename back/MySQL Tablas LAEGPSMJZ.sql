DROP TABLE IF EXISTS Frases;
DROP TABLE IF EXISTS Usuarios;
DROP TABLE IF EXISTS Autores;


CREATE TABLE Autores (
    ID INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    origen VARCHAR(255),
    imagen VARCHAR(255),
    PRIMARY KEY (ID)
);


CREATE TABLE Frases (
    ID INT NOT NULL AUTO_INCREMENT,
    contenido VARCHAR(255),
    procedencia VARCHAR(255),
    id_autor INT, 
    id_autor_incorrecto INT,
    PRIMARY KEY (ID),
    FOREIGN KEY (id_autor) REFERENCES Autores(ID),
    FOREIGN KEY (id_autor_incorrecto) REFERENCES Autores(ID)
);



CREATE TABLE Usuarios(
    ID int NOT NULL auto_increment,
    nombre varchar(255),
    password varchar(255),
    es_admin boolean DEFAULT false,
    puntaje int,
    PRIMARY KEY (ID)
);


INSERT INTO Autores (nombre, apellido, origen, imagen)
VALUES
('Taylor', 'Swift', 'Cantante')
('William', 'Shakespeare', 'Dramaturgo y poeta');

INSERT INTO Frases (contenido, procedencia, id_autor)
VALUES
("Nunca quiero ser un producto de mi entorno. Quiero que mi entorno sea un producto de mí.","Billboard Women in Music Awards", 1),
("Mi amor es tuyo para enseñar. Enséñame a amarte y te mostraré cómo ser amado", "La fierecilla domada", 2);

INSERT INTO Usuarios (nombre, password, puntaje)
VALUES
('Emilia', 'sarmiento01', 90),
('Julieta', 'juju89', 120);

UPDATE Usuarios
SET es_admin = true
WHERE ID = 2;

UPDATE Usuarios
SET es_admin = true
WHERE ID = 1;

UPDATE Autores SET imagen = 'images/sheakspare.png' WHERE id = 2;
UPDATE Autores SET imagen =  WHERE id = 1;
