const boardPixel = document.getElementsByClassName(`board-pixel`)[0];
const inputSizeBoard = document.getElementById(`input-size-board`);
const buttonPlus = document.getElementById(`button-plus`);
const buttonLess = document.getElementById(`button-less`);

const boardCreator = (num) => {
  for (let index = 0; index < num * num; index++) {
    const divPixel = document.createElement(`div`);
    divPixel.classList.add(`pixel`);
    boardPixel.appendChild(divPixel);
  }
  boardPixel.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  boardPixel.style.gridTemplateRows = `repeat(${num}, 1fr)`;
};
const boardClear = (num) => {
  while (boardPixel.children.length != 0) {
    const childBoard = boardPixel.firstElementChild;
    boardPixel.removeChild(childBoard);
  }
  return boardCreator(num);
};
boardCreator(inputSizeBoard.value);

buttonPlus.addEventListener(`click`, ()=>{
  inputSizeBoard.value++
  boardClear(inputSizeBoard.value);
});
buttonLess.addEventListener(`click`, ()=>{
  inputSizeBoard.value--
  boardClear(inputSizeBoard.value);
});
inputSizeBoard.addEventListener(`input`, () => {
  boardClear(inputSizeBoard.value);
});
