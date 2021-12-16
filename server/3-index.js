import express from 'express'

const Pool = require("pg").Pool
const pool= new Pool({
    host:"localhost",
    user:"postgres",
    password:"ganbatte",
    database:"hr_db",
    port : 5432
});

const app = express()
app.use(express.json())

const port = process.env.PORT || 3001;

app.listen(port,()=>{console.log( ` server listen on port ${port}`)})

app.get("/api/region",(req,res)=>{
    pool.query("select * from region",
    [ ],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows)
    }
    )
});

app.get("/api/region/:id",(req,res)=>{
    const {id} = req.params
    pool.query ("select * from region where region_id=$1 ",
    [id],
    (error,result) =>{
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    }
    )
});
app.post("/api/region",(req,res)=>{
    const {region_id, region_name} = req.body;

    pool.query("insert into region (region_id, region_name) values ($1,$2)",
    [region_id, region_name],
    (error, result)=>{
        if (error) {
            throw error
        }
        res.status(201).json(result.rowCount)
    }
    )
});

app.put("/api/region/:id",(req,res)=>{
    const {id} = req.params
    const {region_name} = req.body

    pool.query("update region set region_name=$1 where region_id=$2",
    [region_name, id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    }
    )
})