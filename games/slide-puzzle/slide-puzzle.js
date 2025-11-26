// var rows = 3;
// var columns = 3;

// var currTile;
// var otherTile; //blank tile

// var turns = 0;
// var originalOrder = ["1","2","3","4","5","6","7","8","9"]
// var imgOrder=[originalOrder];
// // var imgOrder = ["4","2","8","5","3","6","7","9","1"];

// window.onload = function() {
//     setBoard(imgOrder)
// }
// function setBoard(order){
//     document.getElementById("board").innerHTML="";
//     for (let r=0; r < rows; r++) {
//         for (let c=0; c < columns; c++) {
            
//             //<img>
//             let tile = document.createElement("img");
//             tile.id = r.toString() + "-" + c.toString();
//             tile.src = "oggys_images/" + imgOrder.shift() + ".png";

//             //DRAG FUNCTIONALITY
//             tile.addEventListener("dragstart",dragStart); //click an image to drag
//             tile.addEventListener("dragover", dragOver); //moving image around while clicked
//             tile.addEventListener("dragenter", dragEnter); //dragging image onto another one
//             tile.addEventListener("dragleave", dragLeave); //dragged image leaving another image
//             tile.addEventListener("drop", dragDrop); //drag an image over another image,drop the image
//             tile.addEventListener("dragend", dragEnd); //after drag drop, swap the two tiles
            
        
//             document.getElementById("board").append(tile);

//         }
//     }
// }
// function shuffleBoard(){
//     turns=0;
//     document.getElementById("turns").innerText=turns;
//     let shuffled=[originalOrder].sort(()=>Math.random()-0.5);
//     imgOrder=shuffled;
//     setBoard([imgOrder]);
// }
// function resetBoard(){
//     turns=0;
//     document.getElementById("turns").innerText=turns;
//     imgOrder=[originalOrder];
//     setBoard([imgOrder]);
// }


// function dragStart() {
//     currTile = this; //this refers to the image tile being dragged
// }

// function dragOver(e) {
//     e.preventDefault();
// }

// function dragEnter(e) {
//     e.preventDefault();
// }

// function dragLeave() {

// }

// function dragDrop() {
//     otherTile = this;//this refers to the img being dropped on
// }

// function dragEnd() {
//     if (!otherTile.src.includes("1.png")) {
//         return;
//     }

//     let currCoards = currTile.id.split("-"); //ex) "0-0" -> ["0","0"]
//     let r = parseInt(currCoards[0]);
//     let c = parseInt(currCoards[1]);

//     let othercoards = otherTile.id.split("-");
//     let r2 = parseInt(othercoards[0]);
//     let c2 = parseInt(othercoards[1]);

//     let moveLeft = r == r2 && c2 == c-1;
//     let moveRight = r == r2 && c2 == c+1;

//     let moveUP = c == c2 && r2 == r-1;
//     let moveDown = c == c2 && r2 == r+1;

//     let isAdjacent = moveLeft || moveRight || moveUP || moveDown;

//     if(isAdjacent) {
//         let currImg = currTile.src;
//         let otherImg = otherTile.src;

//         currTile.src = otherImg;
//         otherTile.src = currImg;

//         turns += 1;
//         document.getElementById("turns").innerText = turns
//     }
// }
var rows = 3;
var columns = 3;

var currTile;
var otherTile; 
var turns = 0;

// original solved order
var originalOrder = ["1","2","3","4","5","6","7","8","9"];
// current order
var imgOrder = [...originalOrder];

window.onload = function() {
  setBoard([...imgOrder]);
};

function setBoard(order) {
  document.getElementById("board").innerHTML = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.id = r + "-" + c;
      tile.src = "./assets/" + order.shift() + ".png";

      // drag events
      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);

      document.getElementById("board").append(tile);
    }
  }
}

// Shuffle button
function shuffleBoard() {
  turns = 0;
  document.getElementById("turns").innerText = turns;

  let shuffled = [...originalOrder].sort(() => Math.random() - 0.5);
  imgOrder = shuffled;
  setBoard([...imgOrder]);
}

// Reset button
function resetBoard() {
  turns = 0;
  document.getElementById("turns").innerText = turns;

  imgOrder = [...originalOrder];
  setBoard([...imgOrder]);
}

function dragStart() {
  currTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this;
}

function dragEnd() {
  if (!otherTile) return;

  // only swap with blank tile (let's say 9.png is blank)
  if (!otherTile.src.includes("1.png")) return;

  let currCoords = currTile.id.split("-");
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = r == r2 && c2 == c-1;
  let moveRight = r == r2 && c2 == c+1;
  let moveUp = c == c2 && r2 == r-1;
  let moveDown = c == c2 && r2 == r+1;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
  }
}
