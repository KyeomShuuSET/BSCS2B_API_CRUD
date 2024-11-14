//instantiation
const express = require("express")
const app=express()
const mysql=require("mysql")
const moment=require("moment")
const cors=require("mysql")

const PORT = process.env.PORT || 5000

const logger = (req, res, next) =>{
    console.log(// http://localhost:500
        `${req.protocol}://${req.get("host")}${req.originalUrl} : ${moment().format()}`
    )
    next();
}

app.use(logger);
app.use(cors());

const connection = mysql.createConnection({
    host: "bm3tgiwertvvg8jjqteu-mysql.services.clever-cloud.com",
    user: "up28q1iim8ul39yd",
    password: "za77QqmMwCYZVrcVKcUA",
    database: "bm3tgiwertvvg8jjqteu",
});

connection.connect();

app.get("/api/members", (req, res) => {
    connection.query("SELECT * FROM userdata", (err,rows, fields) => {
        if(err) throw err;
        res.json(rows)
    })
})

//REPORT - CRUD - SEARCH 
app.get("/api/members/:id", (req, res) => {
    const id=req.params.id
    //res.send(id)
    connection.query(`SELECT * FROM userdata WHERE id=${id}`,(err, row, fields) => {
        if(err) throw err
        if(row.length > 0){
            res.json(rows)
        }else{
            res.status(400).json({msg:`${id} id not found`})
        }
        res.json(rows)
    })
})

//POST
//CREATE - CRUD
app.use(express.urlencoded({extended: false}))
app.post("/api/members", (req, res) => {
    const fname = req.body.fname; //Vernon
    const lname = req.body.lname; //Chwe
    const email = req.body.email; //Vernon@gmail.com
    const gender = req.body.gender; //beki
    connection.query(`INSERT INTO userdata (first_name, last_name, email, gender) VALUES ('${fname}','${lname}', '${email}', '${gender}')`,(err, rows, fields) => {
        if(err) throw err;
        res.json({msg: `Successfully inserted`})
    })
})

//PUT
//UPDATE - CRUD
app.use(express.urlencoded({extended: false}))
app.put("/api/members", (req,res) => {
    const fname = req.body.fname; //Vernon
    const lname = req.body.lname; //Chwe
    const email = req.body.email; //Vernon@gmail.com
    const gender = req.body.gender; //beki
    connection.query(`UPDATE userdata SET first_name='${fname}', last_name='${lname}',email='${email}', gender='${gender}' WHERE id=${id}' ` , (err,rows,fields) => {
        if(err) throw err;
        res.json({msg: `Successfully updated!`})
    })
})



//DELETE
app.use(express.urlencoded({extended: false}))
app.delete("/api/members", (req, res ) =>{
    const id=req.body.id;
    connection.query(`DELETE FROM userdata WHERE id='${id}'`, (err, rows, fields) => {
        if(err) throw err;
        res.json({msg:`Successfully deleted`})
    })


})



app.listen(5000, () => {
    console.log(`Server is running in port ${PORT}`);
})
