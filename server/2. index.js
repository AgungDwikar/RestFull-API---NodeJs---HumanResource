import express from 'express'

const Pool = require("pg").Pool
const pool= new Pool({
    host:"localhost",
    user:"postgres",
    password:"ganbatte",
    database:"shoping_db",
    port : 5432
});

const app = express()
app.use(express.json())

const port = process.env.PORT || 3001;

app.listen(port,()=>{console.log( ` server listen on port ${port}`)})

app.get("/api/users",(req,res)=>{
    pool.query("select * from users",
    [ ],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows)
    }
    )
});

app.get("/api/users/:id",(req,res)=>{
    const {id} = req.params
    pool.query ("select * from users where user_id=$1 ",
    [id],
    (error,result) =>{
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    }
    )

});
app.post("/api/users",(req,res)=>{
    const {user_id, user_name, user_firstname, user_lastname, user_email, user_password, user_phone} = req.body;

    pool.query("insert into users (user_id, user_name, user_firstname, user_lastname, user_email, user_password, user_phone) values ($1,$2,$3,$4,$5,$6,$7)",
    [user_id, user_name, user_firstname, user_lastname, user_email, user_password, user_phone],
    (error, result)=>{
        if (error) {
            throw error
        }
        res.status(201).json(result.rowCount)
    }
    )
});

app.put("/api/users/:id",(req,res)=>{
    const {user_id} = req.params
    const {user_name, user_firstname, user_lastname, user_email, user_password, user_phone} = req.body

    pool.query("/update users set user_name=$1, user_firstname=$2, user_lastname=$3, user_email=$4, user_password=$5, user_phone=$6 where user_id=$7",
    [user_name, user_firstname, user_lastname, user_email, user_password, user_phone,user_id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    }
    )
})