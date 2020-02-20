const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = 80;
const io = require('socket.io')(server);

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/frontend/temp.html');
});

let players = [];
let board;


io.on('connection',(socket)=>{
    let team = 0;
    if(players.length === 0){
        board = new Array(9).fill(0).map(()=>new Array(9).fill(0));
    }
    if(!players.some(p=>p.team===1)) team=1;
    if(!team&&!players.some(p=>p.team===2)) team=2;
    players.push({
        socket,
        team
    });
    socket.on('disconnect',()=>{
        players = players.filter(p=>p.socket.id!==socket.id);
        console.log(players);
    });
    socket.on('play',([b,i])=>{
        console.log(b,i);
    })
    console.log(players);
});

server.listen(port,()=>console.log(`Booted on Port ${port}`));