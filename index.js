const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()) // require body

app.get("/api", async(req, res) =>{ //api

    try{
        res.sendFile("C:/Users/luisc/Desktop/PG-BASIC/index.html");
    } catch (err) {console.log(err.message);}

    console.log("api");
})

//GET TODOS OS MAPAS
app.get("/api/mapas", async(req, res) =>{ 

    try{
        const mapasReq = await pool.query("SELECT * FROM mapas");
        res.json(mapasReq.rows);
    } catch (err) {console.log(err.message);}

    console.log("get todos os mapas");
})

//GET MAPA POR ID
app.get("/api/mapas/:id", async(req, res) =>{

    const { id } = req.params;
    try{
        const mapaReq = await pool.query("SELECT * FROM mapas WHERE id_usuarios = $1",[id]);
        res.json(mapaReq.rows);

    }catch (err) {console.log(err.message);}

    console.log("get mapa:"+id);
})

//POST MAPA
app.post("/api/mapas",async(req, res) => {
    
    const { nome } = req.body;
    const { criador } = req.body;
    const { json } = req.body;
    const { data } = req.body;
    const { id_usuarios } = req.body;

    try{
        const newMapa = await pool.query(
            "INSERT INTO mapas (nome, criador, json, data, id_usuarios) VALUES ($1, $2, $3, $4, $5)",[nome,criador,json,data,id_usuarios]);

        res.json("post");
    } catch (err) { console.error(err.message); }
    
    console.log("mapa criado por "+id_usuarios);
})

//atualizar mapa
app.post("/api/mapas/:id", async(req, res) => { //atualiza a informação do mapa com base no id

    const { id } = req.params; //id do mapa para mudar
    const { nome } = req.body; // o que vai mudar
    const { json } = req.body;
    const { data } = req.body;

    try{
        
        //UPDATE mapas SET nome = 'testupdate',json = 'kekw' WHERE id = 6;
        const updateMapa = await pool.query("UPDATE mapas SET nome = $1, json = $2, data = $3 WHERE id = $4",[nome,json,data,id]);
        res.json(""+updateMapa);
    }catch (err) {console.log(err.message);}
    
    console.log("updated mapa #"+id);
})


app.delete("/api/mapas/:id", async(req, res) => { //remover um mapa

    const { id } = req.params;

    try{
        const deleteMapa = await pool.query("DELETE FROM mapas WHERE id = $1",[id]);
        res.json("todo deletado");
        console.log("Deleted "+id);
    }catch (err) {console.log(err.message);}

})

/////////USUARIOS

//cadastro e login
app.post("/api/usuarios/cadastro",async(req, res) => {
    
    const { nome } = req.body;
    const { senha } = req.body;

    try{
        const newMapa = await pool.query(
            "INSERT INTO usuarios (nome, senha) VALUES ($1, $2)",[nome,senha]);
    } catch (err) { console.error(err.message); }

    try{
        const mapasReq = await pool.query("SELECT id FROM usuarios WHERE nome = $1 AND senha = $2",[nome,senha]);
        var temp = mapasReq.rows[0]["id"];
        res.json(temp);
        console.log("usuario cadastrado id: #"+temp);
    } catch (err) {console.log(err.message);}
    
})

//login
app.post("/api/usuarios/login",async(req, res) => {
    
    const { nome } = req.body;
    const { senha } = req.body;

    try{
        const mapasReq = await pool.query("SELECT id FROM usuarios WHERE nome = $1 AND senha = $2",[nome,senha]);
        var temp = mapasReq.rows[0]["id"];
        res.json(temp);
        console.log("usuario logado id: #"+temp);
    } catch (err) {
        res.send("Nome ou usuario incorreto(s)!");
        console.log(err.message);
    }
    
})


app.listen(5000,() =>{
    console.log("server is listening on port 5000");
});