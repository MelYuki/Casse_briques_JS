let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

let ball = {
    radius : 7.5,
    x : canvas.width / 2,
    y : canvas.height - 40,
    dx : 2,
    dy : -2,
    color :"red"
}
let paddle = {
    width : 60,
    height : 10,
    x : (canvas.width - 60) / 2,
    y : canvas.height - 10 * 3,
    step : 5,
    left : false,
    right : false
}
let wall = {
    column : 7,
    row : 5,
    marginTop : 45,
    marginLeft : 90,
    brick : {
        width : 70,
        height : 15,
        margin : 15,
        x : 0,
        y : 0,
        status : 1,
        color : "black"
    }
}
let color = {
    r : 0,
    g : 0,
    b : 0
}
let score = 0;

const random = (limit) => {
    let num = Math.round(Math.random()*limit);
    return num
}
const setColor = (r = -1, g = -1, b = -1) => {
    if(r == -1 || g == -1 || b == -1) {
        color.r = random(255);
        color.g = random(255);
        color.b = random(255);
    }
    else {
        color.r = r;
        color.g = g;
        color.b = b;
    }
    return `rgba(${color.r}, ${color.g}, ${color.b})`
}

// #region LISTENER
const keyDownHandler = (event) => {
    if (event.key == "Right" || event.key == "ArrowRight") paddle.right = true;
    else if (event.key == "Left" || event.key == "ArrowLeft") paddle.left = true;
}
const keyUpHandler = (event) => {
    if (event.key == "Right" || event.key == "ArrowRight") paddle.right = false;
    else if (event.key == "Left" || event.key == "ArrowLeft") paddle.left = false;
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// #endregion
const movePaddle = () => {
    if (paddle.right && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.step;
    }
    else if (paddle.left && paddle.x > 0) {
        paddle.x -= paddle.step;
    }
}
const drawPaddle = () => {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.fillStyle = setColor(0,0,0);
    context.fill();
    context.closePath();
}

const gameoverOrNot = () => {
    if(ball.y + ball.radius > paddle.y 
        && ball.x > paddle.x - ball.radius
        && ball.x < paddle.x + paddle.width + ball.radius) {
        ball.dy = -random(3);
        ball.color = setColor(255, 0, 0);
    }
    else if (ball.y + ball.radius > canvas.height) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
    }
}
const bounce = () => {
    // UP
    if(ball.y < ball.radius) {
        ball.dy = random(3);
        ball.color = setColor();
    }
    // LEFT
    else if(ball.x < ball.radius) {
        ball.dx = random(3);
        ball.color = setColor();
    }
    // RIGHT
    else if(ball.x > canvas.width - ball.radius) {
        ball.dx = -random(3);
        ball.color = setColor();
    }
    // DOWN
    gameoverOrNot();
}

const drawBall = () => {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = ball.color;
    context.fill();
    context.closePath();
}

const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    bounce();
    drawPaddle();
    movePaddle();
    ball.x += ball.dx;
    ball.y += ball.dy;
}
let interval = setInterval(draw, 10);