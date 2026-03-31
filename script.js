let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let cnt = 0;

let turn0 = true; // player0

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turn0 = true;
    cnt = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        if(turn0){
            box.innerText = "O";
            turn0 = false;
        }
        else{
            box.innerText = "X";
            turn0 = true;
        }

        cnt++;
        box.disabled = true;

        let isWinner = checkWinner();

        if(cnt === 9 && !isWinner){
            gameDraw();
        }
    })
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
     }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
     }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;      
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val=== pos2val && pos2val === pos3val){
                console.log(`winner,  ${pos1val}`); 
                showWinner(pos1val);
            }
        }
    }
}

const gameDraw = () => {
    msg.innerText = "Game was a Draw.";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
