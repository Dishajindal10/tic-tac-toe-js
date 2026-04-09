let userScore = 0;
let compScore = 0;
// select all buttons:
const choices = document.querySelectorAll(".p1 .circle");
const msg = document.querySelector("#msg");
const timerEl = document.querySelector("#timer");
const startBtn = document.querySelector(".startBtn");
const playAgainBtn = document.querySelector(".playAgain");
const userScorePara = document.querySelector("#user");
const compScorePara = document.querySelector("#comp");


let isGameActive = false;

// Fn to generate computer choice:
const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randInd = Math.floor(Math.random() * 3);
    return options[randInd];
}

// main game logic:
const playGame = (userChoice, compChoice) => {
    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissor" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

const showWinner = (userWin, userChoice, compChoice) => {
    msg.style.display = "block";
    playAgainBtn.style.display = "inline-block";
    
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.color = "#00FF00";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lost! ${compChoice} beats your ${userChoice}`;
        msg.style.color = "red";
    }

    if(userScore === 2 || compScore === 2) declareFinalChampion();
    else playAgainBtn.style.display = "inline-block";
};

// 5. draw condition:
const drawGame = () => {
    msg.style.display = "block";
    playAgainBtn.style.display = "inline-block";
    msg.innerText = "Game was a draw. Play again!";
    msg.style.color = "violet";
    console.log("Game was a draw");
}

const declareFinalChampion = () => {
    const finalWinner = userScore === 2 ? "YOU ARE THE CHAMPION!!!" : "YOU LOOSE THIS ROUND";

    msg.innerText = finalWinner;
    msg.style.fontSize = "3rem";
    msg.style.color = "#f1c40f"; 
    
    document.querySelector(".signs").style.pointerEvents = "none";
    document.querySelector(".signs").style.opacity = "0.5";

    playAgainBtn.innerText = "START NEW TOURNAMENT";
    // playAgainBtn.style.display = "inline-block";

    document.querySelectorAll(".circle").forEach(c => {
        c.style.pointerEvents = "none"; 
    });
};

// start button logic:
const startNewRound = () => {
    let cnt = 3;
    isGameActive = false;

    msg.style.display = "none";
    startBtn.style.display = "none";
    playAgainBtn.style.display = "none";
    timerEl.style.display = "block";
    timerEl.innerText = cnt;

    // bring back all circles from prev round:
    document.querySelectorAll(".circle").forEach(c => {
        c.classList.remove("hidden", "chosen");
    });

    const countdown = setInterval(() => {
        cnt--;

        if(cnt > 0) timerEl.innerText = cnt;
        else if (cnt === 0){
            timerEl.innerText = "GO!";
            isGameActive = true;
        }
        else{
            clearInterval(countdown);
            timerEl.style.display = "none";
        }
    }, 1000);
};

startBtn.addEventListener("click", startNewRound);
playAgainBtn.addEventListener("click",() => {
    if (userScore === 2 || compScore === 2) {
        userScore = 0;
        compScore = 0;
        userScorePara.innerText = "0";
        compScorePara.innerText = "0";
        
        document.querySelector(".signs").style.pointerEvents = "auto";
        document.querySelector(".signs").style.opacity = "1";
        
       document.querySelectorAll(".circle").forEach(c => {
            c.style.pointerEvents = "auto";
            c.style.opacity = "1";
        });
        
        playAgainBtn.innerText = "Play Again";
    }
    
    startNewRound();
});

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        if(!isGameActive) return;

        const userChoice = choice.getAttribute("id").replace("p1-", "");
        isGameActive = false;

        choices.forEach(c => {if(c !== choice) c.classList.add("hidden"); });
        choice.classList.add("chosen");

        // computer choice:
        const compChoice = genCompChoice();
        animateComputer(compChoice);
        playGame(userChoice, compChoice);
    });
});

const animateComputer = (compChoice) => {
  const compId = `p2-${compChoice}`;
  const compElement = document.getElementById(compId);
  
  // Hiding other P2 buttons
  const p2Choices = document.querySelectorAll(".p2 .circle");
  p2Choices.forEach(c => {
    if(c.id !== compId) c.classList.add("hidden");
  });

  // Making computer choice bigger
  compElement.classList.add("chosen");
};

