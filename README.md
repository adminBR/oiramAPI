# oiramAPI

Accessible in http://localhost:5000/api
requires a SQL postgree database, and one table.

CREATE DATABASE oiramDB;

CREATE TABLE mapas(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(20),
    criador VARCHAR(20),
    json TEXT,
    data DATE,
    id_usuarios INT
	FOREIGN KEY (id_usuarios) REFERENCES usuarios (id);
);

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(20),
    senha VARCHAR(20)
);
