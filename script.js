//initial stuff
"use strict";

//variables
const HAND = ["scissors", "paper", "stone"];
const HAND_RESULT = ["win", "lose", "tied"];
let isClick = false;
let playerLife = 3;
let enemyLife = 3;

const playerHeart = document.querySelector(".player .health-bar");
const enemyHeart = document.querySelector(".enemy .health-bar");
const playerChoice = document.querySelector(".player-choices-container");

const playerSpeech = document.querySelector(".player-speech-bubble .player-speech-content");
const enemySpeech = document.querySelector(".enemy-speech-bubble .enemy-speech-content");

const enemyImgList = [
  { enemy: "url('img/alienPink.png')",
    bgPosition: "23px 35px"},

  { enemy: "url('img/alienBeige.png')",
  bgPosition: "23px 35px"},

  { enemy: "url('img/bee.png')",
    bgPosition: "23px 26px"},
    
  { enemy: "url('img/spider.png')",
  bgPosition: "20px 82px"},

  { enemy: "url('img/ladyBug.png')",
    bgPosition: "30px 93px"},
];


//randomEnemy
const randomEnemy = Math.floor(Math.random() * 5);
const choosenEnemy = document.querySelector(".enemy-img");
choosenEnemy.style.backgroundImage = enemyImgList[randomEnemy].enemy;
choosenEnemy.style.backgroundPosition = enemyImgList[randomEnemy].bgPosition;


//Click event listener.
playerChoice.addEventListener("click", (e) => {
  if (e.target.nodeName === "SPAN" && !isClick) {
    //get playerHand and enemyHand
    const enemyHand = HAND[Math.floor(Math.random() * 3)];
    const playerHand = e.target.dataset.hand;

    //compare hand (player vs bot) and update game
    updateGameAndSpeech(
      playerHand,
      enemyHand,
      compareHand(playerHand, enemyHand)
    );
  }
}); //end of playerChoice listener

//compare hand and return string result (win,lose,tied);
const compareHand = (playerHand, enemyHand) => {
  switch (playerHand) {
    case "scissors":
      console.log("Enemy hand:" + enemyHand);
      return enemyHand === HAND[1]
        ? HAND_RESULT[0]
        : enemyHand === HAND[2]
        ? HAND_RESULT[1]
        : HAND_RESULT[2];
      break;
    case "paper":
      console.log("Enemy hand:" + enemyHand);
      return enemyHand === HAND[2]
        ? HAND_RESULT[0]
        : enemyHand === HAND[0]
        ? HAND_RESULT[1]
        : HAND_RESULT[2];
      break;
    case "stone":
      return enemyHand === HAND[0]
        ? HAND_RESULT[0]
        : enemyHand === HAND[1]
        ? HAND_RESULT[1]
        : HAND_RESULT[2];
      break;
    default:
      console.error("error occur");
      break;
  }
};

const updateGameAndSpeech = (playerHand, enemyHand, result) => {
  //enable isClick, prevent another click attempt
  isClick = true;

  //get player and enemy heart (life)
  let enemyCurrentHealth = enemyHeart.querySelector(
    `img:nth-child(${enemyLife})`
  );
  let playerCurrentHealth = playerHeart.querySelector(
    `img:nth-child(${playerLife})`
  );

  //updateHeart - if(win), else if (lose)
  if (result === HAND_RESULT[0]) {
    enemyCurrentHealth.classList.add("remove-heart");
    enemyLife--;
  } else if (result === HAND_RESULT[1]) {
    playerCurrentHealth.classList.add("remove-heart");
    playerLife--;
  }

  //display hand
  playerSpeech.classList.toggle("remove-speech");
  playerSpeech.setAttribute("data-speech", `${playerHand}`);

  enemySpeech.classList.toggle("remove-speech");
  enemySpeech.setAttribute("data-speech", `${enemyHand}`);

  // update divider p tag
  const dividerText = document.querySelector(".divider p");
  dividerText.textContent = `You ${result}`;

  setTimeout(() => {
    //remove speech and reset text
    playerSpeech.classList.toggle("remove-speech");
    enemySpeech.classList.toggle("remove-speech");
    dividerText.textContent = dividerText.getAttribute("data-ogText");

    //check life
    if (playerLife < 1 || enemyLife < 1) {
      if(playerLife < 1) {
        dividerText.textContent = "You lose the game";
      } else {
        dividerText.textContent = "You win the game";
      }

      //get and display restart div
      let countDownTimer = 5;
      const restartText = document.getElementById("restartTimer");
      restartText.textContent = `Restarting in: ${countDownTimer}`;
      restartText.style.display = "block";

      //restart the game
      const restartGame = setInterval(function () {
        if (countDownTimer <= 0) {
          clearInterval(restartGame);
          location.reload();
        } else {
          restartText.textContent = `Restarting in: ${countDownTimer}`;
          console.log(countDownTimer);
        }
        countDownTimer--;
      }, 1000);
    } else {
      isClick = false; 
    }
  }, 2000);
};
