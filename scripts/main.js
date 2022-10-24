const boardPixel = document.getElementsByClassName(`board-pixel`)[0];

const boardCreator = (num) => {
  for (let index = 0; index < num * num; index++) {
    const divPixel = document.createElement(`div`);
    divPixel.classList.add(`pixel`);
    boardPixel.appendChild(divPixel);
  }
  boardPixel.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  boardPixel.style.gridTemplateRows = `repeat(${num}, 1fr)`;
};
boardCreator(25);
