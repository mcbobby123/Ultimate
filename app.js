const express = require('express');
const app = express();
const port = 4000;

app.use(express.static('frontend/build'));

app.use('*',(req,res)=>{
    res.send('hello world');
})

app.listen(port,()=>console.log(`Booted on Port ${port}`));