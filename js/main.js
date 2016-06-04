const chess = document.getElementById("chess");
const context = chess.getContext('2d');

context.strokeStyle = "#BFBFBF";

//记录棋盘每个点的状态
const chessBoard = [];
//赢的数组  三维
const wins = [];
//赢法统计数组
const myWin = [];
const computerWin = [];

let me = true;
let over = false;

for (let i = 0; i < 15; i++) {
    chessBoard[i] = [];
    for (let j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
    }
}

for (let i = 0; i < 15; i++) {
    wins[i] = [];
    for (let j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}
//横线
let count = 0;
for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
    }
}
//竖线
for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count++;
    }
}
//斜线
for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}
//反斜线
for (let i = 0; i < 11; i++) {
    for (let j = 14; j > 3; j--) {
        for (let k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}

for (let i = 0; i < count; i++) {
    myWin[i] = 0;
    computerWin[i] = 0;
}


drawChessBoard();

//oneStep(0,0,true);
//oneStep(1,1,false);

chess.onclick = function (e) {
    if (over)
        return;
    if (!me)
        return;
    const x = e.offsetX;
    const y = e.offsetY;
    const i = Math.floor(x / 30);
    const j = Math.floor(y / 30);
    if (chessBoard[i][j] == 0) {
        oneStep(i, j, me);
        chessBoard[i][j] = 1;
        for (let k = 0; k < count; k++) {
            if(k==166){
            }
            if (wins[i][j][k]) {
                myWin[k]++;
                computerWin[k] = 6;
                if (myWin[k] == 5) {
                    alert("win");
                    over = true;
                }
            }

        }
        if (!over) {
            me = !me;
            computerAI();
        }
    }
};
function drawChessBoard() {
    for (let i = 0; i < 15; i++) {
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();

        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
    }
}


function oneStep(i, j, me) {
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    const gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if (me) {
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#636363");
    } else {
        gradient.addColorStop(0, "#d1d1d1");
        gradient.addColorStop(1, "#f9f9f9");
    }
    context.fillStyle = gradient;
    context.fill();
}

function computerAI() {
    const myScore = [];
    const computerScore = [];
    let max=0,u = 0, v = 0;
    for(let i = 0; i < 15; i++){
        myScore[i] = [];
        computerScore[i] =[];
        for(let j = 0; j < 15; j++){
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for(let i = 0; i < 15; i++){
        for(let j = 0; j < 15; j++){
            if(chessBoard[i][j] == 0){
                for(let k = 0; k < count; k++){
                    if(wins[i][j][k]){
                        if(myWin[k] == 1){
                            myScore[i][j] += 200;
                        }else if(myWin[k] == 2){
                            myScore[i][j] += 400;
                        }else if(myWin[k] == 3){
                            myScore[i][j] +=2000;
                        }else if(myWin[k] == 4){
                            myScore[i][j] +=10000;
                        }
                        if(computerWin[k] == 1){
                            computerScore[i][j] += 220;
                        }else if(computerWin[k] == 2){
                            computerScore[i][j] += 420;
                        }else if(computerWin[k] == 3){
                            computerScore[i][j] +=2100;
                        }else if(computerWin[k] == 4){
                            computerScore[i][j] +=20000;
                        }
                    }
                }
                if(myScore[i][j] > max){
                    max = myScore[i][j];
                    u = i;
                    v = j;
                }else if(myScore[i][j] == max){
                  if(computerScore[i][j] > computerScore[u][v]){
                      u = i;
                      v = j;
                  }
                }
                if(computerScore[i][j] > max){
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                }else if(computerScore[i][j] == max){
                    if(myScore[i][j] > myScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    oneStep(u,v,false);
    chessBoard[u][v] = 2;
     for (let k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            computerWin[k]++;
            myWin[k] = 6;
            if (computerWin[k] == 5) {
                alert("computer win");
                over = true;
            }
        }

    }
    if (!over) {
        me = !me;
    }
}