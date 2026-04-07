// 1. select all buttons:
const choices = document.querySelectorAll(".p1 .circle");
const msg = document.querySelector("#msg");
const timerEl = document.querySelector("#timer");
const startBtn = document.querySelector(".startBtn");

let isGameActive = false;

// 2. Fn to generate computer choice:
const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randInd = Math.floor(Math.random() * 3);
    return options[randInd];
}

// 3. main game logic:
const playGame = (userChoice, compChoice) => {
       
    if(userChoice === compChoice) 
        drawGame();
    else{
        let userWin = true;

        if (userChoice === "rock")
            userWin = (compChoice === "paper") ? false : true;
        else if (userChoice === "paper")
            userWin = (compChoice === "scissor") ? false : true;
        else 
            userWin = (compChoice === "rock") ? false : true;
        
        showWinner(userWin, userChoice, compChoice);
    }

} 

// 4. showWinner:
const showWinner = (userWin, userChoice, compChoice) => {
    msg.style.display = "block";
    if(userWin){
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }
    else{
        msg.innerText = `You lost! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

// 5. draw condition:
const drawGame = () => {
    msg.style.display = "block";
    msg.innerText = "Game was a draw. Play again!";
    msg.style.backgroundColor = "#081b31";
    console.log("Game was a draw");
}

// start button logic:
startBtn.addEventListener("click", () => {
    let cnt = 3;
    isGameActive = false;

    msg.style.display = "none";
    startBtn.style.display = "none";
    timerEl.style.display = "block";
    timerEl.innerText = cnt;

    // bring back all circles from prev round:
    document.querySelectorAll(".circles").forEach(c => {
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
});


// 6. adding event listener:
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
        playGame(userChoice, compChoice); // Pass compChoice directly now
    });
});

const animateComputer = (compChoice) => {
  const compId = `p2-${compChoice}`;
  const compElement = document.getElementById(compId);
  
  // Hide other P2 buttons
  const p2Choices = document.querySelectorAll(".p2 .circle");
  p2Choices.forEach(c => {
    if(c.id !== compId) c.classList.add("hidden");
  });

  // Make computer choice bigger
  compElement.classList.add("chosen");
};