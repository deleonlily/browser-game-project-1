const canvas = document.getElementById('canvas');
const ctx = canvas.getcontext('2d');
const img = newImage();
img.src = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";

let gamePlaying = false;
const gravity = .5;
const speed = 6.2;
const size = [51,36];
const jump = -11.5;
const cTenth = (canvas.width / 10);

let index = 0,
    bestScore = 0,
    flight,
    flyHeight,
    currentScore,
    pipe;

const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth))- pipeWidth)) + pipeWidth;

const setup = () => {
    currentScore = 0;
    flight = jump;
}

