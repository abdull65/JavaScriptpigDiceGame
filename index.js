const rolledScoreBox1 = document.querySelector(".rolledScoreBox1");
const rolledScoreBox2 = document.querySelector(".rolledScoreBox2");
const currentScore1 = document.querySelector(".currentScore1");
const currentScore2 = document.querySelector(".currentScore2");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const newGameBtn = document.getElementById("newGame");
const rollDiceBtn = document.getElementById("rollDice");
const holdGameBtn = document.getElementById("holdGame");
const diceImage = document.querySelector("#diceImage");
const firstPlayer = document.querySelector(".player1");
const secondPlayer = document.querySelector(".player2");
let prompt1 = prompt("FIRST PLAYER PLEASE ENTER YOUR NAME HERE");
let prompt2 = prompt("SECOND PLAYER PLEASE ENTER YOUR NAME HERE");
let winningScorePrompt = prompt("SET WINNING SCORE");
let winningScore = 0;
firstPlayer.textContent = prompt1 === "" ? "PLAYER 1" : prompt1;
secondPlayer.textContent = prompt2 === "" ? "PLAYER 2" : prompt2;
let activeScore = 0;
let scoresArr = [0, 0];
if (winningScorePrompt === "") {
  alert("please insert a winning score!");
  winningScorePrompt = prompt("SET WINNING SCORE");
}
if (isNaN(winningScorePrompt)) {
  alert("winning score not valid! please insert a valid winning score");
  winningScorePrompt = prompt("SET VALID WINNING SCORE");
} else {
  winningScore = Number(winningScorePrompt);
}
let gameState = true;
diceImage.style.display = "none";
rollDiceBtn.addEventListener("click", () => {
  if (gameState) {
    diceImage.style.display = "block";
    const diceArr = [
      "dice-1",
      "dice-2",
      "dice-3",
      "dice-4",
      "dice-5",
      "dice-6",
    ];
    const randomDice = Math.floor(Math.random() * diceArr.length);
    diceImage.src = `./${diceArr[randomDice]}.png`;
    diceImage.alt = `Dice ${randomDice + 1}`;
    if (randomDice !== 0) {
      activeScore += randomDice + 1;
      if (player1.classList.contains("active")) {
        rolledScoreBox1.textContent = activeScore;
        rolledScoreBox2.textContent = 0;
      } else if (player2.classList.contains("active")) {
        rolledScoreBox1.textContent = 0;
        rolledScoreBox2.textContent = activeScore;
      }
    } else {
      activeScore = 0;

      if (player1.classList.contains("active")) {
        rolledScoreBox2.textContent = 0;
        rolledScoreBox1.textContent = activeScore;
        player1.classList.remove("active");
        player2.classList.add("active");
      } else if (player2.classList.contains("active")) {
        rolledScoreBox1.textContent = 0;
        rolledScoreBox2.textContent = activeScore;
        player2.classList.remove("active");
        player1.classList.add("active");
      }
    }
  }
});
holdGameBtn.addEventListener("click", () => {
  if (gameState) {
    if (player1.classList.contains("active")) {
      scoresArr[0] += activeScore;
      currentScore1.textContent = scoresArr[0];
      rolledScoreBox1.textContent = 0;
      if (scoresArr[0] >= winningScore) {
        gameState = false;
        currentScore1.textContent = scoresArr[0];
        player1.classList.add("active");
        diceImage.style.display = "none";
        alert(`${firstPlayer.textContent} WINS!`);
      } else {
        activeScore = 0;
        player1.classList.remove("active");
        player2.classList.add("active");
      }
    } else if (player2.classList.contains("active")) {
      scoresArr[1] += activeScore;
      currentScore2.textContent = scoresArr[1];
      rolledScoreBox2.textContent = 0;

      if (scoresArr[1] >= winningScore) {
        gameState = false;
        currentScore2.textContent = scoresArr[1];
        player2.classList.add("active");
        diceImage.style.display = "none";
        alert(`${secondPlayer.textContent} WINS!`);
      } else {
        activeScore = 0;
        player2.classList.remove("active");
        player1.classList.add("active");
      }
    }
  }
});
newGameBtn.addEventListener("click", () => {
  activeScore = 0;
  scoresArr = [0, 0];
  gameState = true;
  rolledScoreBox1.textContent = 0;
  rolledScoreBox2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  diceImage.style.display = "none";
  player1.classList.add("active");
  player2.classList.remove("active");
  prompt1 = prompt("FIRST PLAYER PLEASE ENTER YOUR NAME HERE");
  prompt2 = prompt("SECOND PLAYER PLEASE ENTER YOUR NAME HERE");
  firstPlayer.textContent = prompt1 === "" ? "PLAYER 1" : prompt1;
  secondPlayer.textContent = prompt2 === "" ? "PLAYER 2" : prompt2;
  winningScore = parseInt(prompt("SET NEW WINNING SCORE"));
});
