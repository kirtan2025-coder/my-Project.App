const mysql=require('mysql');
const express=require('express');
const path=require('path');

const app=express();
app.use(express.json());

// mysql connection
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Kirtan1997@',
    database:'mycollege'
});

db.connect((err)=>{
    if (err) throw err;
    console.log('connected to mysql');
});

//sever HTML from
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.use(express.urlencoded({extended:true}));
//insert student
app.post('/students',(req,res)=>{
    const{id,name}=res.body;
    const sql='insert into student(id,nmae) values(?,?)';
    db.query(sql,[id,name],(err,result)=>{
        if (err)
            console.error('error inserting data',err);
        console.log('inserted student',id);
        res.send('student successfully added to the DB');
    });
});

//start server
app.listen(3000,()=>{
    console.logO('API running at http://localhost:3000');
});