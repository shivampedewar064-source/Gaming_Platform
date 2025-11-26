const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const currentScoreElement = document.getElementById('currentScore');
const highScoreElement = document.getElementById('highScore');

// Game constants
const TILE_SIZE = 20;
const CANVAS_SIZE = 400; // 400x400
const TILE_COUNT = CANVAS_SIZE / TILE_SIZE; // 20 tiles
const GAME_SPEED = 150; // milliseconds

// Game state
let snake = [{ x: 10, y: 10 }]; // Start in the middle
let food = {};
let dx = 0; // velocity x (initial stop)
let dy = 0; // velocity y (initial stop)
let score = 0;
let gameLoopInterval;
let isGameStarted = false;

// --- High Score Handling ---
function getHighScore() {
    // Retrieve high score from Local Storage, default to 0
     return parseInt(localStorage.getItem('snakeHighScore') || 0);
}

function updateHighScore(newScore) {
     const currentHigh = getHighScore();
    if (newScore > currentHigh) {
         localStorage.setItem('snakeHighScore', newScore);
         highScoreElement.textContent = newScore;
     }
}

function displayScores() {
    highScoreElement.textContent = getHighScore();
     currentScoreElement.textContent = score;
}
// Initial high score display
displayScores();

// --- Game Logic ---

function placeFood() {
    // Generate random coordinates for food, ensuring it's not on the snake
    let newFood;
     do {
        newFood = {
             x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT)
         };
     } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    food = newFood;
}

function drawGame() {
    // 1. Clear the canvas
    ctx.fillStyle = '#1abc9c';
     ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // 2. Draw Food
     ctx.fillStyle = 'red';
     ctx.fillRect(food.x * TILE_SIZE, food.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

     // 3. Draw Snake
     snake.forEach((segment, index) => {
        ctx.fillStyle = (index === 0) ? '#3498db' : '#2980b9'; // Head is a different color
        ctx.fillRect(segment.x * TILE_SIZE, segment.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
         // Add a border for separation
         ctx.strokeStyle = '#34495e';
         ctx.strokeRect(segment.x * TILE_SIZE, segment.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
     });
}

function updateGame() {
     // Stop if the game is not active
     if (!isGameStarted || (dx === 0 && dy === 0)) return;

    // Create the new head position
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // --- Check for Game Over Conditions --- 
    // 1. Wall collision
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
         gameOver();
        return;
    }

    // 2. Self collision (start checking from the 4th segment to avoid immediate collision)
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
             gameOver();
             return;
         }
    }

     // Add the new head to the snake
     snake.unshift(head);

     // --- Check for Food Consumption ---
     if (head.x === food.x && head.y === food.y) {
       // Snake ate the food: Increase score and place new food
         score++;
        currentScoreElement.textContent = score;
         placeFood(); // The tail is NOT removed, so the snake grows
     } else {
        // Snake did NOT eat the food: Remove the tail segment (moves the snake)
         snake.pop();
    }

    drawGame();
}

function gameOver() {
    clearInterval(gameLoopInterval);
    isGameStarted = false;
    updateHighScore(score);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER!', CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 20);
    ctx.font = '20px Arial';
    ctx.fillText('Press SPACEBAR to restart', CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 20);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    currentScoreElement.textContent = score;
    placeFood();
    drawGame();
    clearInterval(gameLoopInterval);
    isGameStarted = false;

    // Display a starting message if you like
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
     ctx.textAlign = 'center';
     ctx.fillText('Press SPACEBAR to begin!', CANVAS_SIZE / 2, CANVAS_SIZE / 2);
}

function startGame() {
     if (isGameStarted) return;
     isGameStarted = true;
    // Start moving right by default if not already moving
     if (dx === 0 && dy === 0) {
         dx = 1;
         dy = 0;
     }
    gameLoopInterval = setInterval(updateGame, GAME_SPEED);
}

// --- Event Listeners ---

document.addEventListener('keydown', (e) => {
    // Only allow controls if not on the exit screen (dx/dy are 0 after game over)
    if (!isGameStarted && e.key !== ' ') return; 

     switch (e.key) {
        case 'ArrowUp':
         case 'w':
             if (dy !== 1) { dx = 0; dy = -1; }
             if (!isGameStarted) startGame(); // Auto-start on first move
             break;
         case 'ArrowDown':
         case 's':
             if (dy !== -1) { dx = 0; dy = 1; }
             if (!isGameStarted) startGame();
             break;
         case 'ArrowLeft':
        case 'a':
             if (dx !== 1) { dx = -1; dy = 0; }
            if (!isGameStarted) startGame();
             break;
        case 'ArrowRight':
        case 'd':
            if (dx !== -1) { dx = 1; dy = 0; }
             if (!isGameStarted) startGame();
             break;
        case ' ': // Spacebar to start/restart
             e.preventDefault(); // Prevent page scroll
            if (!isGameStarted) {
                resetGame(); // Reset before starting a new game
             startGame();
             }
            break;
     }
});

// Initialize the game on load
window.onload = resetGame;