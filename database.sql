CREATE DATABASE todo_database;

--\c para entrar no db

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
); 

CREATE TABLE mapas(
    mapa_id SERIAL PRIMARY KEY,
    mapa_nome VARCHAR(20),
    mapa_criador VARCHAR(20),
    mapa_json TEXT,
    mapa_data DATE,
    mapa_Branch INT
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
