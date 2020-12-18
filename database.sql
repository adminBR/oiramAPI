CREATE DATABASE todo_database;

--\c para entrar no db

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
); 

CREATE DATABASE oiramDB;

CREATE TABLE mapas(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(20),
    criador VARCHAR(20),
    json TEXT,
    data DATE
);


    

public class MapaClass
{
    public int mapa_id;
    public string mapa_nome;
    public string mapa_criador;
    public string mapa_json;
    public string mapa_data;
    //public string mapa_Branch;
}
