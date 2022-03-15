//colors the focus game piece to indicate where the user must go
let enable = (index) => {
  document
    .querySelector(`.arena-container[data-index="${index}"]`)
    .classList.add("enabled");
};
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
  currentCell.classList.remove("disable");
  document.querySelectorAll(".arena-container").forEach((cell, i) => {
    if (i != currentIndex) {
      cell.classList.add("disable");
    }
  });
};

//set to -1 so i do try to disable the last index if the user just started
let lastActiveIndex = -1;

//for every indivdual cell i attach an event listener the directs the focus to the correct spot
//by matching the indexs of the smaller games to the bigger game
document.querySelectorAll(".mini-box").forEach((cell) => {
  cell.addEventListener("click", () => {
    let i = cell.dataset.index;
    disableAllBut(i);
    enable(i);
    console.log(i);
    if (lastActiveIndex != i) {
      disable(lastActiveIndex);
    }
    lastActiveIndex = i;
  });
});
