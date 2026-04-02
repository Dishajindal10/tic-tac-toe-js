// 1. select all buttons:
const choices = document.querySelectorAll(".p1 .circle");
const msg = document.querySelector("#msg");

// 2. Fn to generate computer choice:
const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randInd = Math.floor(Math.random() * 3);
    return options[randInd];
}

// 3. main game logic:
const playGame = (userChoice) => {
    console.log("User Choice : ", userChoice);
    const compChoice = genCompChoice();
    console.log("Computer Choice : ", compChoice);
    
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
    if(userWin){
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        console.log("You win!");
    }
    else{
        msg.innerText = `You lost! ${compChoice} beats you ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

// 5. draw condition:
const drawGame = () => {
    msg.innerText = "Game was a draw. Play again!";
    msg.style.backgroundColor = "#081b31";
    console.log("Game was a draw");
}

// 6. adding event listener:
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id").replace("p1-", "");
        console.log("Button was clicked: ", userChoice);
        playGame(userChoice);
    })
})