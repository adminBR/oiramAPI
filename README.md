# oiramAPI

Accessible in http://localhost:5000/api/mapas
requires a SQL postgree database, and one table.

CREATE DATABASE oiramDB;

CREATE TABLE mapas(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(20),
    criador VARCHAR(20),
    json TEXT,
    data DATE,
    Branch INT
);
