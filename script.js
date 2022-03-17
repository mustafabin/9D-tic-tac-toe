//takes away the color indicating the focus game piece
let disable = (index) => {
  if (index != -1) {
    document
      .querySelector(`.arena-container[data-index="${index}"]`)
      .classList.remove("enabled");
  }
};
//prevents any click events other than the ones in focus/are colored
//disable class removes all pointer events
let disableAllBut = (currentIndex) => {
  let currentCell = document.querySelector(
    `.arena-container[data-index="${currentIndex}"]`
  );
  //colors the focus game piece to indicate where the user must go
  currentCell.classList.add("enabled");
  currentCell.classList.remove("disable");
  document.querySelectorAll(".arena-container").forEach((cell, i) => {
    if (i != currentIndex) {
      cell.classList.add("disable");
    }
  });
  if (lastActiveIndex != currentIndex) {
    disable(lastActiveIndex);
  }
  lastActiveIndex = currentIndex;
};
let enableAll = () => {
  document.querySelectorAll(".arena-container").forEach((cell, i) => {
    cell.classList.remove("disable");
  });
};
let toggleTurn = () => {
  if (player.turn == "X") {
    player.turn = "O";
    player.color = "blue";
  } else {
    player.turn = "X";
    player.color = "red";
  }
};
let play = (cell, self) => {
  let p = document.createElement("p");
  p.innerText = player.turn;
  p.style.color = player.color;
  p.classList.add("text");
  cell.appendChild(p);
  isMiniOver(self);
  toggleTurn();
};
let isFull = (i) => {
  let cell = document.querySelector(`.arena-container[data-index="${i}"]`);
  let arr = cell.querySelectorAll(".mini-box");
  if (cell.dataset.conquered == "n") {
    for (let cell = 0; cell < arr.length; cell++) {
      //if its empty
      if (!arr[cell].textContent) {
        return false;
      }
    }
  }
  return true;
};
//is the mini game over
let isMiniOver = (i) => {
  let pos1,
    pos2,
    pos3,
    gameState = [];
  let bigCell = document.querySelector(`.arena-container[data-index="${i}"]`);
  bigCell.querySelectorAll(".mini-box").forEach((cell) => {
    gameState.push(cell.textContent);
  });
  for (let i = 0; i < winningCombos.length; i++) {
    pos1 = gameState[winningCombos[i][0]];
    pos2 = gameState[winningCombos[i][1]];
    pos3 = gameState[winningCombos[i][2]];
    //check if there arent empty
    //since all three postions have to equal i just need to check pos1 if its empty
    if (pos1) {
      if (pos1 == pos2 && pos1 == pos3) {
        conquer(pos1, bigCell);
        return true;
      }
    }
  }
  return false;
};
let conquer = (winner, cell) => {
  cell.dataset.conquered = "y";
  if (winner == "X") {
    cell.classList.add("red-conquer");
  } else {
    cell.classList.add("blue-conquer");
  }
};
//set to -1 so i do try to disable the last index if the user just started
let lastActiveIndex = -1;
let player = {
  turn: "X",
  color: "red",
};
let ultiGameState = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//for every indivdual cell i attach an event listener the directs the focus to the correct spot
//by matching the indexs of the smaller games to the bigger game
document.querySelectorAll(".mini-box").forEach((cell) => {
  cell.addEventListener("click", (e) => {
    //if the cell is empty than its a vaild move
    let self = cell.dataset.selfindex;
    if (!cell.innerText) {
      let i = cell.dataset.index;
      if (!isFull(i)) {
        play(cell, self);
        disableAllBut(i);
      } else {
        disable(self);
        enableAll();
      }
    }
  });
});
