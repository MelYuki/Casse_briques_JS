let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
// La balle
let x = canvas.width / 2;
let y = canvas.height - 40;
let dx = 2;
let dy = -2;
let ballRadius = 7.5;
// La raquette
let paddleWidth = 60;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight * 3;
let paddleStep = 5;
let leftPressed = false;
let rightPressed = false;
// Le mur de briques
let brickColumnCount = 7;
let brickRowCount = 5;
let brickWidth = 70;
let brickHeight = 15;
let brickPadding = 10;
let brickMarginTop = 45;
let brickMarginLeft = 120;
let bricksTab = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricksTab[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricksTab[c][r] = {x: 0, y: 0, status: 1};
    }
}
let brickX = 0;
let brickY = 0;
// Les scores
let score = 0;

const win = () => {
    if (score == brickColumnCount * brickRowCount) {
        alert("!!! C'est GAGNÉ !!!");
        document.location.reload();
        clearInterval(interval);
    }
}
const drawScore = () => {
    context.font = "16px Arial";
    context.fillStyle = "black";
    context.fillText(`Score : ${score}`, 10, 20);
}

const collisionDetection = () => {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricksTab[c][r];
            if (b.status == 1 && x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                dy = -dy;
                b.status = 0;
                // 3) Ajout d'un point pour chaque brique cassée
                score++;
            }
        }
    }
}
const drawBricks = () => {
    context.beginPath();
    context.rect(brickX, brickY, brickWidth, brickHeight);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
}
const setWall = () => {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricksTab[c][r];
            if (b.status == 1) {
                brickX = c * (brickWidth + brickPadding) + brickMarginLeft;
                brickY = r * (brickHeight + brickPadding) + brickMarginTop;
                b.x = brickX;
                b.y = brickY;
                drawBricks();
            }
        }
    }
}

const keyDownHandler = (event) => {
    if (event.key == "Right" || event.key == "ArrowRight") rightPressed = true;
    else if (event.key == "Left" || event.key == "ArrowLeft") leftPressed = true;
}
const keyUpHandler = (event) => {
    if (event.key == "Right" || event.key == "ArrowRight") rightPressed = false;
    else if (event.key == "Left" || event.key == "ArrowLeft") leftPressed = false;
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

const movePaddle = () => {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleStep;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= paddleStep;
    }
}
const drawPaddle = () => {
    context.beginPath();
    context.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
}

const gameoverOrNot = () => {
    if (x > paddleX && x < paddleX + paddleWidth && y == paddleY) dy = -dy;
    else if (y > canvas.height - ballRadius) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
    }
}
const bounce = () => {
    if (y < ballRadius) dy = -dy;
    gameoverOrNot();
    if (x < ballRadius || x > canvas.width - ballRadius) dx = -dx;
}

const drawBall = () => {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
}

const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    bounce();
    drawPaddle();
    movePaddle();
    setWall();
    collisionDetection();
    drawScore();
    win();
    x += dx
    y += dy
}
let interval = setInterval(draw, 10);