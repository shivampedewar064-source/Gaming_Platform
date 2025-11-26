
// Sudoku logic: generator + solver (backtracking)
const sudokuEl = document.getElementById('sudoku');
const difficultyEl = document.getElementById('difficulty');
const newBtn = document.getElementById('newBtn');
const solveBtn = document.getElementById('solveBtn');
const checkBtn = document.getElementById('checkBtn');
const status = document.getElementById('status');

let solution = [];
let puzzle = [];
let cells = [];

function idx(r,c){return r*9 + c}
function rc(i){return [Math.floor(i/9), i%9]}

function buildGrid(){
  sudokuEl.innerHTML = '';
  cells = [];
  for(let r=0;r<9;r++){
    for(let c=0;c<9;c++){
      const cell = document.createElement('div');
      cell.className = 'cell';
      if((c+1)%3===0 && c!==8) cell.classList.add('box-right');
      if((r+1)%3===0 && r!==8) cell.classList.add('box-bottom');
      const input = document.createElement('input');
      input.setAttribute('inputmode','numeric');
      input.setAttribute('maxlength','1');
      input.dataset.r = r; input.dataset.c = c;
      input.addEventListener('input', onInput);
      input.addEventListener('keydown', onKeyDown);
      input.addEventListener('focus', onFocus);
      cell.appendChild(input);
      sudokuEl.appendChild(cell);
      cells.push({cell, input});
    }
  }
}

function onInput(e){
  const v = e.target.value.replace(/[^1-9]/g,'');
  e.target.value = v;
}

function onKeyDown(e){
  if((e.key === 'Backspace' || e.key === 'Delete')){
    e.target.value = '';
    highlightRelated(e.target, true);
    return;
  }
  if(e.key>= '1' && e.key <= '9'){
    setTimeout(()=>checkConflicts(),0);
  }
}

function onFocus(e){ highlightRelated(e.target); }

function highlightRelated(target, clear=false){
  cells.forEach(({cell})=>cell.classList.remove('highlight'));
  if(clear || !target) return;
  const r = Number(target.dataset.r), c = Number(target.dataset.c);
  cells.forEach(({cell,input})=>{
    const rr=Number(input.dataset.r), cc=Number(input.dataset.c);
    if(rr===r || cc===c || (Math.floor(rr/3)===Math.floor(r/3) && Math.floor(cc/3)===Math.floor(c/3))) cell.classList.add('highlight');
  });
}

function copyBoard(b){ return b.map(row=>row.slice()); }

function isSafe(board, r,c, val){
  for(let i=0;i<9;i++) if(board[r][i]===val) return false;
  for(let i=0;i<9;i++) if(board[i][c]===val) return false;
  const sr = Math.floor(r/3)*3, sc = Math.floor(c/3)*3;
  for(let i=0;i<3;i++) for(let j=0;j<3;j++) if(board[sr+i][sc+j]===val) return false;
  return true;
}

function solveBoard(board){
  for(let r=0;r<9;r++){
    for(let c=0;c<9;c++){
      if(board[r][c]===0){
        for(let val=1;val<=9;val++){
          if(isSafe(board,r,c,val)){
            board[r][c]=val;
            if(solveBoard(board)) return true;
            board[r][c]=0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generateSolved(){
  const board = Array.from({length:9}, ()=>Array(9).fill(0));
  const numbers = [1,2,3,4,5,6,7,8,9];
  function shuffle(arr){ for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];} }

  function fill(board){
    for(let r=0;r<9;r++){
      for(let c=0;c<9;c++){
        if(board[r][c]===0){
          shuffle(numbers);
          for(let k=0;k<9;k++){
            const val = numbers[k];
            if(isSafe(board,r,c,val)){
              board[r][c]=val;
              if(fill(board)) return true;
              board[r][c]=0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  fill(board);
  return board;
}

function makePuzzle(solved, cluesToRemove){
  const b = copyBoard(solved);
  let removed = 0;
  const attempts = cluesToRemove;
  while(removed < attempts){
    const r = Math.floor(Math.random()*9); const c = Math.floor(Math.random()*9);
    if(b[r][c]===0) continue;
    b[r][c]=0;
    removed++;
  }
  return b;
}

function render(puzz){
  puzzle = copyBoard(puzz);
  cells.forEach(({cell,input},i)=>{
    const [r,c]=rc(i);
    const val = puzz[r][c];
    input.value = val===0? '': val;
    input.disabled = false; cell.classList.remove('fixed'); cell.classList.remove('wrong');
    if(val!==0){ input.value = val; input.disabled = true; cell.classList.add('fixed'); }
  });
  status.textContent = 'Game loaded';
}

function checkConflicts(){
  let anyWrong = false;
  cells.forEach(({cell,input},i)=>{
    const [r,c]=rc(i);
    const val = input.value ? Number(input.value) : 0;
    cell.classList.remove('wrong');
    if(val!==0){
      if(!isSafePartial(r,c,val)){
        cell.classList.add('wrong'); anyWrong=true;
      }
    }
  });
  status.textContent = anyWrong? 'There are mistakes' : 'No obvious mistakes';
  return !anyWrong;
}

function isSafePartial(r,c,val){
  for(let i=0;i<9;i++){
    if(i!==c){
      const v = Number(cells[idx(r,i)].input.value) || puzzle[r][i];
      if(v === val) return false;
    }
    if(i!==r){
      const v = Number(cells[idx(i,c)].input.value) || puzzle[i][c];
      if(v === val) return false;
    }
  }
  const sr=Math.floor(r/3)*3, sc=Math.floor(c/3)*3;
  for(let i=0;i<3;i++) for(let j=0;j<3;j++){
    const rr=sr+i, cc=sc+j; if(rr===r && cc===c) continue;
    const v = Number(cells[idx(rr,cc)].input.value) || puzzle[rr][cc];
    if(v===val) return false;
  }
  return true;
}

function getUserBoard(){
  const b = Array.from({length:9}, ()=>Array(9).fill(0));
  cells.forEach(({input},i)=>{ const [r,c]=rc(i); b[r][c] = input.value ? Number(input.value) : 0; });
  return b;
}

function newGame(){
  status.textContent = 'Generating...';
  solution = generateSolved();
  const removals = Number(difficultyEl.value);
  const puzz = makePuzzle(solution, removals);
  render(puzz);
}

function solveGame(){
  const b = copyBoard(solution);
  cells.forEach(({cell,input},i)=>{
    const [r,c]=rc(i);
    input.value = b[r][c]; input.disabled = true; cell.classList.add('fixed'); cell.classList.remove('wrong');
  });
  status.textContent = 'Solved';
}

function checkGame(){
  const user = getUserBoard();
  let ok = true;
  for(let r=0;r<9;r++) for(let c=0;c<9;c++){
    const u = user[r][c];
    if(u===0){ ok=false; }
    if(u!==solution[r][c]){ ok=false; }
  }
  if(ok) status.textContent = 'Congratulations — puzzle solved!'; else status.textContent = 'Not solved yet. Keep going!';
}

buildGrid(); newGame();
newBtn.addEventListener('click', ()=>newGame());


// Exit to home
exitBtn.addEventListener("click", () => {
  gameScreen.classList.remove("active");
  homeScreen.classList.add("active");
});
