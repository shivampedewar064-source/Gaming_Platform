const ball = document.getElementById("ball");
const paddle = document.getElementById("paddle");
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");

let ballX = Math.random() * 360 + 20;
let ballY = 0;
let ballSpeed = 1.5;
let paddleX = 160;
let score = 0;

function updateBall() {
  ballY += ballSpeed;

  if (ballY > 580) {
    // Check collision
    const paddleLeft = paddleX;
    const paddleRight = paddleX + 80;

    if (ballX >= paddleLeft && ballX <= paddleRight) {
      score++;
      scoreDisplay.textContent = score;
      resetBall();
    } else {
      alert("Game Over! Final Score: " + score);
      resetGame();
    }
  }

  ball.style.top = ballY + "px";
  ball.style.left = ballX + "px";
}

function resetBall() {
  ballX = Math.random() * 360 + 20;
  ballY = 0;
}

function resetGame() {
  score = 0;
  scoreDisplay.textContent = score;
  resetBall();
}

function updatePaddle() {
  paddle.style.left = paddleX + "px";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && paddleX > 0) {
    paddleX -= 20;
  } else if (e.key === "ArrowRight" && paddleX < 320) {
    paddleX += 20;
  }
  updatePaddle();
});

function gameLoop() {
  updateBall();
  requestAnimationFrame(gameLoop);
}

updatePaddle();
gameLoop();