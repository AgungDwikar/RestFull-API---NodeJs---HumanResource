import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
dotenv.config();

const app = express();
const port = process.env.PORT || 3007

app.listen(port,()=> console.log(`Server listening on port ${port}`))
app.get('/',responeText)
app.get('/json',responseJson)
app.get('/static/*',responeStatic)
app.use('*',responeStatic)

function responeText(req,res){
    res.setHeader('Content-type','text/plain');
    res.end("Hello NodeJS Batch 14")
}
function responseJson(req, res) {
    res.json({employee:[
        {
            empId : 100,
            Firstname : "Agung",
            Lastname : "dwika"
        },
        {
            empId : 101,
            Firstname : "naufal",
            Lastname : "ammar"
        }
    ]})
}
function responeNotFound(req, res) {
    res.writeHead(404,{'Content-type' : 'text/plain'})
    res.end("page not found")
}
function responeStatic(req,res){
    const filename = `${__dirname}/public/images/${req.params[0]}`;
    fs.createReadStream(filename)
    .on('error',()=> respondNotFound)
    .pipe(res)
}
