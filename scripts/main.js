const boardPixel = document.getElementsByClassName(`board-pixel`)[0];
const inputSizeBoard = document.getElementById(`input-size-board`);
const buttonPlus = document.getElementById(`button-plus`);
const buttonLess = document.getElementById(`button-less`);
const clearAll = document.getElementById(`clear-all`);
const gridBorder = document.getElementById(`grid-border`);
const pixel = document.querySelectorAll(`.pixel`);
const boardColors = document.getElementsByClassName(`board-color-palette`);
const radioColor = document.querySelectorAll(`.radio-color`);

const getColor = () => {
  const colors = {
    color0: document.getElementsByClassName(`color-palette`)[0].value,
    color1: document.getElementsByClassName(`color-palette`)[1].value,
    color2: document.getElementsByClassName(`color-palette`)[2].value,
    color3: document.getElementsByClassName(`color-palette`)[3].value,
    color4: document.getElementsByClassName(`color-palette`)[4].value,
  };
  return colors;
};

const pickColor = () => {
  let colorSelected = 0;
  for (i of radioColor) {
    if (i.checked) {
      console.log(i.value);
      colorSelected = i.value;
    }
  }
  const selectedColor = getColor()[`color${colorSelected}`];
  return selectedColor;
};

const painting = () => {
  const windowEventTarget = window.event.target;
  if (windowEventTarget.className === `pixel`) {
    windowEventTarget.style.backgroundColor = `${pickColor()}`;
  }
};

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

const removeGrid = () => {
  if (gridBorder.checked === false) {
    for (const i in boardPixel.children) {
      boardPixel.children[i].className = ``;
    }
  } else {
    for (const i in boardPixel.children) {
      boardPixel.children[i].className = `pixel`;
    }
  }
};

boardCreator(inputSizeBoard.value);
buttonPlus.addEventListener(`click`, () => {
  inputSizeBoard.value++;
  boardClear(inputSizeBoard.value);
});
buttonLess.addEventListener(`click`, () => {
  inputSizeBoard.value--;
  boardClear(inputSizeBoard.value);
});

inputSizeBoard.addEventListener(`input`, () => boardClear(inputSizeBoard.value));
clearAll.addEventListener(`click`, () => boardClear(inputSizeBoard.value));
boardPixel.addEventListener(`click`, painting);
boardPixel.addEventListener('dragover', painting);
gridBorder.addEventListener(`click`, removeGrid);

// document.onkeypress = (e) => {
//   console.log(e);
//   boardPixel.addEventListener('mousemove', painting);
// };
// window.addEventListener(`keydown`, ()=>{
// })
// window.addEventListener(`keyup`, ()=>{
//   boardPixel.removeEventListener('mousemove', painting);
// })

