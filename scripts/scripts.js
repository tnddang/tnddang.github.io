const playerProfilePicture      = document.getElementById("player-profile");
const computerProfilePicture    = document.getElementById("computer-profile");
const playerDiceOne             = document.getElementById("player-dice-one");
const playerDiceTwo             = document.getElementById("player-dice-two");
const computerDiceOne           = document.getElementById("computer-dice-one");
const computerDiceTwo           = document.getElementById("computer-dice-two");
const playerScore               = document.getElementById("player-score");
const computerScore             = document.getElementById("computer-score");
const gameRound                 = document.getElementById("round");
const playerText                = document.getElementById("playertext");
const computerText              = document.getElementById("computertext");
const playerTitle               = document.getElementById("player");
const resetButton               = document.getElementById("start");

//Numbers
const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;

let gameInProgress = false;
let playerRollOne;
let playerRollTwo;
let computerRollOne;
let computerRollTwo;
let round;
let player;
let computer;

function load() {

    if (!gameInProgress) {
        initialize();
    } else {
        start();
    }
}

//Initialize Player and Computer stats
function initialize() {
    gameInProgress = true;
    player = new Player();
    computer = new Computer();
    round = ZERO;
    loadProfileImages();
    makeRollDiceActive();
}

//Load profile images for participants
function loadProfileImages() {
    playerProfilePicture.src = `images/player.jpeg`;
    computerProfilePicture.src = `images/computer.jpeg`;
}

function start() {
    if (round === 3) {
        declareTheWinner();
        makeResetActive();
    } else {
       play();
       console.log(round);
    }
}

//Random dice rolls
function rollTheDice() {

    let result = Math.floor(Math.random() * 6 + 1);

    switch (result) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        default:
            0;
    }

    return result;

}

function play() {

    playerRollOne = rollTheDice();
    playerRollTwo = rollTheDice();

    computerRollOne = rollTheDice();
    computerRollTwo = rollTheDice();

    player.points = calculateScore(playerRollOne, playerRollTwo);
    computer.points = calculateScore(computerRollOne, computerRollTwo);

    player.score += calculateScore(playerRollOne, playerRollTwo);
    computer.score += calculateScore(computerRollOne, computerRollTwo);

    playerDiceOne.src = `images/dice${playerRollOne}.png`;
    playerDiceTwo.src = `images/dice${playerRollTwo}.png`;

    computerDiceOne.src = `images/dice${computerRollOne}.png`;
    computerDiceTwo.src = `images/dice${computerRollTwo}.png`;

    playerText.innerHTML = `You scored ${player.points} this round.`;
    computerText.innerHTML = `Computer scored ${computer.points} this round`;

    round++;

    updateScoreboard();

}

//Calculate the score for the dice roll
function calculateScore(firstRoll, secondRoll) {

    let result;

    if (firstRoll == ONE || secondRoll == ONE) {
        result = ZERO;
    } else if (firstRoll == secondRoll) {
        result = (firstRoll + secondRoll) * TWO;
    } else {
        result = firstRoll + secondRoll;
    }

    return result;

}

//Update the scoreboard
function updateScoreboard() {

    playerScore.innerHTML = `Player: ${player.points}`;
    computerScore.innerHTML = `Computer: ${computer.points}`;
    gameRound.innerHTML = `Round: ${round}`;

}

//Determine the winner
function declareTheWinner() {

    gameInProgress = false;

    if (player.points > computer.points) {
        playerText.innerHTML = `<b>You win</b>`;
    } else if (computer.points > player.points) {
        computerText.innerHTML = '<b>Computer wins</b>'
    } else if (player.points == computer.points) {
        playerText.innerHTML  = `<b>It's a tie</b>`;
        computerText.innerHTML = `<b>It's a tie</b>`;
    }

}

//Activate reset button
function makeResetActive() {
        resetButton.innerHTML = `Reset game`;
        clear();
        updateScoreboard();
}

function clear() {
    player.points = ZERO;
    computer.points = ZERO;
    round = ZERO;

    playerText.innerHTML = '';
    computerText.innerHTML = '';

}
//Active roll dice button
function makeRollDiceActive() {
    resetButton.innerHTML = `Roll the dice!`;
}

//Player object
class Player {
    constructor(points) {
        this.points = ZERO;
    }
}

//Computer object
class Computer {
    constructor(points) {
        this.points = ZERO;
    }
}

