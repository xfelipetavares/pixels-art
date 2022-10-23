const boxPixels = document.getElementsByClassName(`box-pixels`)[0];

const boardCreator = (num) => {
  for (let index = 0; index <= num * num; index++) {
    const divPixel = document.createElement(`div`);
    divPixel.classList.add(`pixel`);
    boxPixels.appendChild(divPixel);
  }
//   boxPixels.style = `grid-template-columns: repeat(${num}, 39px)`;
};
boardCreator(5);
