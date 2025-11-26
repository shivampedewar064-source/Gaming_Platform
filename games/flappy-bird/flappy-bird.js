// --- Game Setup ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// UI Elements
const currentScoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreElement = document.getElementById("finalScore");
const restartButton = document.getElementById("restartBtn");

// Game Constants
const BIRD_SIZE = 30;
const GRAVITY = 0.05;
const JUMP_VELOCITY = -5;
const PIPE_WIDTH = 50;
const PIPE_GAP = 150;
const PIPE_SPEED = 3;
const PIPE_SPACING = 200; // Horizontal distance between pipes

// Game State Variables
let birdY = canvas.height / 2;
let velocity = 0;
let pipes = [];
let score = 0;
let highScore = parseInt(localStorage.getItem("flappyHighScore")) || 0;
let gameRunning = false;
let animationFrameId;

// --- High Score Initialization ---
highScoreElement.textContent = highScore;

// --- Bird Drawing & Physics ---
function drawBird() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(50, birdY, BIRD_SIZE, BIRD_SIZE);
}

function updateBird() {
    // Apply gravity
    velocity += GRAVITY;
    birdY += velocity;

    // Boundary check (hitting the ground)
    if (birdY + BIRD_SIZE > canvas.height) {
        birdY = canvas.height - BIRD_SIZE;
        gameOver();
    }
    // Boundary check (hitting the top - optional, but helps)
    if (birdY < 0) {
        birdY = 0;
        velocity = 0; // Stop upward movement
    }
}

function jump() {
    if (gameRunning) {
        velocity = JUMP_VELOCITY;
    }
}

// --- Pipe Management ---
function createPipe() {
    // Random height for the gap (ensuring it's not too close to the edges)
    const minHeight = 50;
    const maxHeight = canvas.height - PIPE_GAP - minHeight;
    const gapY = Math.random() * (maxHeight - minHeight) + minHeight;

    pipes.push({
        x: canvas.width,
        topHeight: gapY,
        bottomY: gapY + PIPE_GAP,
        scored: false
    });
}

function updatePipes() {
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - PIPE_SPACING) {
        createPipe();
    }

    for (let i = 0; i < pipes.length; i++) {
        const pipe = pipes[i];
        pipe.x -= PIPE_SPEED;

        // Check for score
        if (pipe.x + PIPE_WIDTH < 50 && !pipe.scored) {
            score++;
            pipe.scored = true;
            currentScoreElement.textContent = score;
        }

        // Remove off-screen pipes
        if (pipe.x + PIPE_WIDTH < 0) {
            pipes.splice(i, 1);
            i--; // Decrement index since we removed an element
        }
    }
}

function drawPipes() {
    ctx.fillStyle = 'green';
    for (const pipe of pipes) {
        // Top Pipe
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        // Bottom Pipe
        ctx.fillRect(pipe.x, pipe.bottomY, PIPE_WIDTH, canvas.height - pipe.bottomY);
    }
}

// --- Collision Detection ---
function checkCollision() {
    const birdX = 50;
    const birdYBottom = birdY + BIRD_SIZE;
    const birdXRight = birdX + BIRD_SIZE;

    for (const pipe of pipes) {
        const pipeXRight = pipe.x + PIPE_WIDTH;

        // Horizontal collision
        if (birdXRight > pipe.x && birdX < pipeXRight) {
            // Vertical collision with top pipe
            if (birdY < pipe.topHeight) {
                return true;
            }
            // Vertical collision with bottom pipe
            if (birdYBottom > pipe.bottomY) {
                return true;
            }
        }
    }
    return false;
}

// --- Game Loop and States ---
function gameLoop() {
    if (!gameRunning) return;

    // 1. Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Update Elements
    updateBird();
    updatePipes();

    // 3. Check for Collision
    if (checkCollision()) {
        gameOver();
        return;
    }

    // 4. Draw Elements
    drawPipes();
    drawBird();

    // 5. Loop
    animationFrameId = requestAnimationFrame(gameLoop);
}

function startGame() {
    // Reset state
    birdY = canvas.height / 2;
    velocity = 0;
    pipes = [];
    score = 0;
    currentScoreElement.textContent = score;

    gameRunning = true;
    gameOverScreen.hidden = true;

    // Start the game loop
    gameLoop();
}

function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationFrameId);

    // Update High Score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("flappyHighScore", highScore);
        highScoreElement.textContent = highScore;
    }

    finalScoreElement.textContent = score;
    gameOverScreen.hidden = false;
}

// --- Event Listeners and Initial Setup ---
function setupListeners() {
  canvas.addEventListener("click", () => {
    if (!gameRunning) startGame();
    jump();
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      if (!gameRunning) startGame();
      jump();
    }
  });

  restartButton.addEventListener("click", () => {
    gameOverScreen.hidden = true;
    startGame();
  });
}

gameOverScreen.hidden = true;
setupListeners();
startGame();