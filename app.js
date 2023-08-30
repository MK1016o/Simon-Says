const h3 = document.querySelector("h3");
const boxes = document.querySelectorAll(".box");
const level = 0;
const gameSeq = [];
const userSeq = [];
const seq = ["red", "yellow", "purple", "blue"];
const started = false;
const highScore = 0;
const p = document.querySelector("p");
const hoverAudio = document.createElement('audio');
hoverAudio.setAttribute('src', 'hover.mp3');
const gameOverAudio = document.createElement('audio');
gameOverAudio.setAttribute('src', 'game-over.wav');


function check(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    gameSeq = [];
    setTimeout(() => {
      h3.innerHTML = `Game Over <br> Your Score is ${level} <br> Press any Key to Continue`;
      level = 0;
    }, 250);
    highScore = Math.max(highScore, level);
    p.innerText = `HIGH SCORE : ${highScore}`;
    gameOverAudio.play();
    started = false;
  }
}

for (box of boxes) {
  box.addEventListener("click", function (ev) {
    const btn = this;
    userFlash(btn);
    userSeq.push(btn.getAttribute("id"));
    check(userSeq.length - 1);
  });
  box.addEventListener("mouseover",function () {
    hoverAudio.play();
    console.log("hover");
  })
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 250);
}

function flash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;
  let randomIdx = Math.floor(Math.random() * 3);
  gameSeq.push(seq[randomIdx]);
  const randBtn = document.querySelector(`.${seq[randomIdx]}`);
  flash(randBtn);
}

document.addEventListener("keypress", () => {
  if (started == false) {
    levelUp();
    started = true;
  }
});
