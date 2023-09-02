const h3 = document.querySelector("h3");
const boxes = document.querySelectorAll(".box");
let level = 0;
let gameSeq = [];
let userSeq = [];
const seq = ["red", "yellow", "purple", "blue"];
let started = false;
let highScore = 0;
const p = document.querySelector("p");
const hoverAudio = document.createElement('audio');
hoverAudio.setAttribute('src', '../Sound/hover.mp3');
const gameOverAudio = document.createElement('audio');
gameOverAudio.setAttribute('src', '../Sound/game-over.wav');


function check(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    setTimeout(() => {
      h3.innerHTML = `Game Over <br> Your Score is ${level} <br>`;
      level = 0;
    }, 100);
    highScore = Math.max(highScore, level);
    p.innerText = `HIGH SCORE : ${highScore}`;
    gameOverAudio.play();
    started = false;
    for(box of boxes) {
      box.classList.add('disable');
    }

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
  })
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 150);
}

function flash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 150);
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

const btn = document.querySelector('button');
btn.addEventListener("click", () => {
  if (started == false) {
    gameSeq = [];
    for(box of boxes) {
      box.classList.remove('disable');
    }
    levelUp();
    started = true;
  }
});
