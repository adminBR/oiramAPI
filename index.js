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

app.get("/api/mapas", async(req, res) =>{ //receber todos os mapas
    try{
        const mapasReq = await pool.query("SELECT * FROM mapas");
        res.json(mapasReq.rows);
    } catch (err) {console.log(err.message);}
    console.log("get todos os mapas");
})

app.get("api/mapas/:id", async(req, res) =>{ //pedir um mapa com base no id
    const { id } = req.params;
    try{
        const mapaReq = await pool.query("SELECT * FROM mapas WHERE mapa_id = $1",[id]);

        res.json(mapaReq.rows);
    }catch (err) {console.log(err.message);}
    
    console.log("get mapa:"+id);
})


app.post("/api/mapas",async(req, res) => { //inserir um mapa
    const { mapa_nome } = req.body;
    const { mapa_criador } = req.body;
    const { mapa_json } = req.body;
    const { mapa_data } = req.body;
    try{
        const newMapa = await pool.query(
            "INSERT INTO mapas (mapa_nome, mapa_criador, mapa_json, mapa_data) VALUES ($1, $2, $3, $4)",[mapa_nome,mapa_criador,mapa_json,mapa_data]);

        res.json("post");
    } catch (err) { console.error(err.message); }
    
    console.log("post");
})

app.put("/api/mapas/:id", async(req, res) => { //atualiza a informação do mapa com base no id
    const { id } = req.params; //id do mapa para mudar
    const { mapa_nome } = req.body; // o que vai mudar
    const { mapa_criador } = req.body;
    const { mapa_json } = req.body;
    const { mapa_data } = req.body;
    try{
        var tempS = "UPDATE mapas SET ";
        if(mapa_nome != ""){tempS = TempS + mapa_nome +" ,"}
        if(mapa_criador != ""){tempS = TempS + mapa_criador + " ,"}
        if(mapa_json != ""){tempS = TempS + mapa_json + " ,"}
        if(mapa_data != ""){tempS = TempS + mapa_data} //data tem que atualiza no final
        tempS = tempS+"WHERE mapas_id = "+id;
        const updateMapa = await pool.query(tempS);
   // const updateMapa = await pool.query("UPDATE mapas SET description = $1 WHERE mapas_id = $2",[description,id]);
        res.json(""+tempS);
    }catch (err) {console.log(err.message);}
    
    console.log("update");
})

app.delete("/api/mapas/:id", async(req, res) => { //remover um mapa
    const { id } = req.params;
    try{
        const deleteMapa = await pool.query("DELETE FROM mapas WHERE mapa_id = $1",[id]);
        res.json("todo deletado");
    }catch (err) {console.log(err.message);}
})


app.listen(5000,() =>{
    console.log("server is listening on port 5000");
});