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

flyHeight = (canvas.height / 2) - (size[1] / 2);

pipes = Array(3).fill().map((a, i) => [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()]);

const render = () => {
    index++;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
  
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -(index * (speed / 2)) % canvas.width, 0, canvas.width, canvas.height);

    if (gamePlaying){
        pipes.map(pipe => {
          
          pipe[0] -= speed;
    
          
          ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);
        
          ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap);
    
          if(pipe[0] <= -pipeWidth){
            currentScore++;
            bestScore = Math.max(bestScore, currentScore);
            pipes = [...pipes.slice(1), [pipes[pipes.length-1][0] + pipeGap + pipeWidth, pipeLoc()]];
            console.log(pipes);
          }
        
          if ([
            pipe[0] <= cTenth + size[0], 
            pipe[0] + pipeWidth >= cTenth, 
            pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1]
          ].every(elem => elem)) {
            gamePlaying = false;
            setup();
          }
        })
      }
}