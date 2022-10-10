// global variables
const selected = document.getElementsByClassName('selected');
const color = document.getElementsByClassName('color');
const buttonRandomColor = document.getElementById('button-random-color');
const pixel = document.getElementsByClassName('pixel');
const colorPalette = document.getElementById('color-palette');
const pixelBoard = document.getElementById('pixel-board');
const clearBoard = document.getElementById('clear-board');
const boardSize = document.getElementById('board-size');
const generateBoard = document.getElementById('generate-board');
// const boardSizeValue = boardSize.value

// functions
const changeSelected = () => {
  const windowEventTarget = window.event.target;
  if (windowEventTarget.className === 'color') {
    selected[0].className = 'color';
    windowEventTarget.className = 'color selected';
  }
};
const pickColor = () => {
  const pickedColor = selected[0].style.backgroundColor;
  return pickedColor;
};
const painting = () => {
  const saveState = JSON.parse(localStorage.pixelBoard);
  const windowEventTarget = window.event.target;
  if (windowEventTarget.className === 'pixel') {
    windowEventTarget.style.backgroundColor = `${pickColor()}`;
    for (const i in pixelBoard.children) {
      if (windowEventTarget === pixelBoard.children[i]) {
        saveState.push(i, pixelBoard.children[i].style.backgroundColor);
      }
    }
  }
  localStorage.setItem('pixelBoard', JSON.stringify(saveState));
};
const colorGenerate = () => {
  const colorGen = [0, 0, 0];
  for (const index in colorGen) {
    colorGen[index] = Math.floor(Math.random() * 256);
  }
  return `rgb(${colorGen[0]}, ${colorGen[1]}, ${colorGen[2]})`;
};
const cleaningBoard = () => {
  while (pixelBoard.children.length > 0) {
    const pixelChild = pixelBoard.lastChild;
    pixelBoard.removeChild(pixelChild);
  }
};
const repainting = () => {
  for (const i of pixelBoard.children) {
    i.style.backgroundColor = 'white';
  }
};
const saveColorsStorage = (box1, box2, box3) => {
  const colorsStorage = {
    color1: box1,
    color2: box2,
    color3: box3,
  };
  localStorage.setItem('colorPalette', JSON.stringify(colorsStorage));
};
const randomColors = (colorClass) => {
  const color = colorClass;
  for (const i in color) {
    i == 0
      ? (color[i].style = 'background-color: black')
      : (color[i].style = `background-color: ${colorGenerate()}`);
  }
  saveColorsStorage(
    color[1].style.backgroundColor,
    color[2].style.backgroundColor,
    color[3].style.backgroundColor
  );
};
const getColorsStorage = () => {
  if (localStorage.colorPalette) {
    const colorPalette = JSON.parse(localStorage.colorPalette);
    color[0].style = 'background-color: black';
    color[1].style = `background-color: ${colorPalette.color1}`;
    color[2].style = `background-color: ${colorPalette.color2}`;
    color[3].style = `background-color: ${colorPalette.color3}`;
  } else {
    color[0].style = 'background-color: black';
    color[1].style = 'background-color: red';
    color[2].style = 'background-color: yellow';
    color[3].style = 'background-color: blue';
  }
};
const getDrawStorage = () => {
  if (localStorage.pixelBoard) {
    const drawStorage = JSON.parse(localStorage.pixelBoard);
    for (const i in drawStorage) {
      if (i % 2 === 1) {
        pixel[drawStorage[i - 1]].style = `background-color: ${drawStorage[i]}`;
      }
    }
  } else {
    localStorage.setItem('pixelBoard', JSON.stringify(['0', 'white']));
  }
};
const pixelBoardGenerator = (value) => {
  for (let i = 1; i <= value * value; i += 1) {
    const pixelDynamic = document.createElement('div');
    pixelDynamic.className = 'pixel';
    pixelBoard.appendChild(pixelDynamic);
  }
  pixelBoard.style.gridTemplateColumns = `repeat(${value}, 3.9rem)`;
  pixelBoard.style.gridTemplateRows = `repeat(${value}, 3.9rem)`;
  localStorage.setItem('boardSize', JSON.stringify(value));
  getDrawStorage();
};

const createDynamicBoard = (value) => {
  cleaningBoard();
  switch (true) {
  case value === '':
    alert('Board inválido!');
    pixelBoardGenerator(5);
    break;
  case value < 5:
    pixelBoardGenerator(5);
    break;
  case value > 50:
    pixelBoardGenerator(50);
    console.log(pixelBoard.children.length);
    break;
  default:
    pixelBoardGenerator(value);
    break;
  }
};
const getBoarderSize = () => {
  if (localStorage.boardSize) {
    const size = JSON.parse(localStorage.boardSize);
    console.log(size);
    createDynamicBoard(size);
  } else {
    localStorage.setItem('boardSize', JSON.stringify(5));
    getBoarderSize();
  }
};
window.onload = () => {
  getBoarderSize();
  getColorsStorage();
  getDrawStorage();
  buttonRandomColor.addEventListener('click', () => randomColors(color));
  generateBoard.addEventListener('click', () =>
    createDynamicBoard(boardSize.value)
  );
  clearBoard.addEventListener('click', () => repainting());
  colorPalette.addEventListener('click', () => changeSelected());
  pixelBoard.addEventListener('click', () => painting());
  pixelBoard.addEventListener('dragover', () => painting());
};
