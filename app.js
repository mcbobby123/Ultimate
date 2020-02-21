const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = 4000;
const io = require('socket.io')(server);

app.use(express.static('frontend/build'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/frontend/build/temp.html');
});

let players = [];
/**
 * @type {number[][]}
 */
let board;
/**
 * @type {number[]}
 */
let greaterBoard;
/**
 * @type {number}
 */
let turn;

const turnMap = [0,2,1];

io.on('connection',(socket)=>{
    let team = 0;
    if(players.length === 0){
        board = new Array(9).fill(0).map(()=>new Array(9).fill(0));
        greaterBoard = new Array(9).fill(0);
        turn = 1;
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
    socket.on('play',([boardIndex,subBoardIndex])=>{
        board[boardIndex][subBoardIndex]=team;
        if(checkWin(board[boardIndex])){
            greaterBoard[boardIndex]=turn;
            if(checkWin(greaterBoard)) greaterBoard = new Array(9).fill(turn);
            for(const i in greaterBoard){
                if(greaterBoard[i]) board[i]=new Array(9).fill(greaterBoard[i]);
            }
        }
        let sector = subBoardIndex;
        if(!board[subBoardIndex].includes(0)) sector = -1;
        turn=turnMap[turn];
        io.emit('update',{board,turn,sector});
    })
    console.log(players);
    socket.emit('update',{me:team,board,turn})
});

server.listen(port,()=>console.log(`Booted on Port ${port}`));

function checkWin(grid){
    for(let i = 0; i < 3; i++){
        if(g(0,i)===g(1,i)&&g(0,i)===g(2,i)&&g(0,i)!==0) return g(0,i);
        if(g(i,0)===g(i,1)&&g(0,i)===g(i,2)&&g(i,0)!==0) return g(i,0);
    }
    if(g(0,0)!==0&&g(0,0)===g(1,1)&&g(0,0)===g(2,2)) return g(0,0);
    if(g(0,2)!==0&&g(0,2)===g(1,1)&&g(0,2)===g(2,0)) return g(0,2);
    function g(x,y){
        return grid[x*3+y];
    }
    return 0;
}