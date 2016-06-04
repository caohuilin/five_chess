const chess = document.getElementById("chess");
const context = chess.getContext('2d');

context.strokeStyle = "#BFBFBF";

const chessBoard = [];

let me = true;

for(let i = 0; i < 15; i++){
    chessBoard[i] = [];
    for(let j = 0; j < 15; j++){
        chessBoard[i][j] = 0;
    }
}

drawChessBoard();

//oneStep(0,0,true);
//oneStep(1,1,false);

chess.onclick = function(e){
    const x = e.offsetX;
    const y = e.offsetY;
    const i = Math.floor(x / 30);
    const j = Math.floor(y / 30);
    if(chessBoard[i][j] == 0){
        oneStep(i,j,me);
        if(me)
            chessBoard[i][j] = 1;
        else
            chessBoard[i][j] = 2;
        me = !me;
    }
};
function drawChessBoard(){
    for(let i = 0; i < 15; i++){
        context.moveTo(15 + i * 30,15);
        context.lineTo(15 + i * 30,435);
        context.stroke();

        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
    }
}


function oneStep(i,j,me){
    context.beginPath();
    context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
    context.closePath();
    const gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if(me){
        gradient.addColorStop(0,"#0a0a0a");
        gradient.addColorStop(1,"#636363");
    }else{
        gradient.addColorStop(0,"#d1d1d1");
        gradient.addColorStop(1,"#f9f9f9");
    }
    context.fillStyle = gradient;
    context.fill();
}