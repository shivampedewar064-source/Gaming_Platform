let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newgame = document.querySelector(".newbtn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let line = document.getElementById("line");

let turno = true;  // true = O (player), false = X (computer)
let count = 0;
let gameActive=true;

const winpatterns = [
  [0,1,2,"row1"],
  [3,4,5,"row2"],
  [6,7,8,"row3"],
  [0,3,6,"col1"],
  [1,4,7,"col2"],
  [2,5,8,"col3"],
  [0,4,8,"diag1"],
  [2,4,6,"diag2"],
];

const resetGame = () => {
  turno = true;
  count = 0;
   gameActive=true;
  enableboxes();
  msgcontainer.classList.add("hide");
  line.style.display = "none";
};

// Player move
// boxes.forEach(function(box, index){
//   box.addEventListener("click", function(){
//     if(turno){
//       box.innerText = "O";
//       box.classList.add("xyz"); // Blue O
//       turno = false;
//     } else{
//       box.innerText = "X";
//       box.classList.add("abc"); // Orange X
//       turno = true;
//     }
//     box.disabled = true;
//     count++;

//     let iswinner = checkwinner();
//     if(count === 9 && !iswinner){
//       gamedraw();
//     }
//   });
// });
// 



// Player move
boxes.forEach(function(box, index){
  box.addEventListener("click", function(){
    if(!turno || !gameActive || box.innerText !== "") return;
    
    box.innerText = "O";
    box.classList.add("xyz"); // Blue O
    box.disabled = true;
    count++;

    if(checkwinner()){
      return;
    }
    if(count === 9){
      gamedraw();
      return;
    }

    turno = false;
    gameActive = false;
    setTimeout(aiMove, 500);
  });
});

// AI move
const aiMove = () => {
  let availableBoxes = Array.from(boxes).filter(box => box.innerText === "");
  
  if(availableBoxes.length === 0) return;
  
  // AI strategy: Check if AI can win, block player, or play strategically
  let move = findBestMove();
  
  if(move !== -1){
    boxes[move].innerText = "X";
    boxes[move].classList.add("abc"); // Orange X
    boxes[move].disabled = true;
    count++;

    if(checkwinner()){
      gameActive = false;
      return;
    }
    if(count === 9){
      gamedraw();
      return;
    }
  }

  turno = true;
  gameActive = true;
};

// Find best move for AI
const findBestMove = () => {
  // Check if AI can win
  for(let [a,b,c] of winpatterns){
    let cells = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
    if(cells.filter(c => c === "X").length === 2 && cells.includes("")){
      let emptyIndex = [a,b,c].find(idx => boxes[idx].innerText === "");
      return emptyIndex;
    }
  }

  // Block player's winning move
  for(let [a,b,c] of winpatterns){
    let cells = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
    if(cells.filter(c => c === "O").length === 2 && cells.includes("")){
      let emptyIndex = [a,b,c].find(idx => boxes[idx].innerText === "");
      return emptyIndex;
    }
  }

  // Play center if available
  if(boxes[4].innerText === "") return 4;

  // Play corners
  let corners = [0,2,6,8].filter(idx => boxes[idx].innerText === "");
  if(corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

  // Play any available
  let available = Array.from(boxes).map((box, idx) => box.innerText === "" ? idx : -1).filter(idx => idx !== -1);
  return available[Math.floor(Math.random() * available.length)];
};

// Draw game
const gamedraw = () => {
  msg.innerText = " Game is Draw!";
  msgcontainer.classList.remove("hide");
  gameActive = false;
  // disableboxes();
};

// Enable boxes
const enableboxes = () => {
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("xyz","abc");
  }
};

// Disable boxes
const disableboxes = () => {
  for(let box of boxes){
    box.disabled = true;
  }
};

// Show Winner
const showwinner = (winner, pattern) => {
  msg.innerText = ` Winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  drawLine(pattern);
    gameActive = false;
  // disableboxes();
};

// Check Winner
const checkwinner = () => {
  for(let [a,b,c,type] of winpatterns){
    let pos1 = boxes[a].innerText;
    let pos2 = boxes[b].innerText;
    let pos3 = boxes[c].innerText;

    if(pos1 && pos1 === pos2 && pos2 === pos3){
      showwinner(pos1, type);
      return true;
    }
  }
  return false;
};

// Draw glowing line for winner
function drawLine(type){
  line.style.display = "block";
  switch(type){
    case "row1": line.style.transform = "translate(-50%, -110px)"; break;
    case "row2": line.style.transform = "translate(-50%, -0px)"; break;
    case "row3": line.style.transform = "translate(-50%, 110px)"; break;

  //   case "col1": line.style.transform = "rotate(90deg) translate(-50%, -500px)"; break;
  //   case "col2": line.style.transform = "rotate(90deg) translate(-50%, 0px)"; break;
  //   case "col3": line.style.transform = "rotate(90deg) translate(-50%, 200px)"; break;
    
  //   case "diag1": line.style.transform = "rotate(45deg) translate(0%, 0%)"; break;
  //   case "diag2": line.style.transform = "rotate(-45deg) translate(0%, 0%)"; break;
  //   case "diag1": line.style.transform = "rotate(45deg) translate(-50%, -50%)"; break;
  //   case "diag2": line.style.transform = "rotate(-45deg) translate(-50%, -50%)"; break;
  // }
}

newgame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);