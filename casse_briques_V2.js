let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

let ball = {
    radius : 6,
    x : canvas.width / 2,
    y : canvas.height - 40,
    dx : 2,
    dy : -2,
    color : "red"
}
let paddle = {
    width : 60,
    height : 10,
    x : (canvas.width - 60) / 2,
    y : canvas.height - 10 * 3,
    step : 5,
    left : false,
    right : false,
    color : "black"
}
let wall = {
    tab : [],
    column : 7,
    row : 5,
    marginTop : 45,
    marginLeft : 110
}
let brick = {};
for(let c = 0; c < wall.column; c++) {
    wall.tab[c] = [];
    for(let r = 0; r < wall.row; r++) {
        brick = {
            id : (c * wall.row + r) + 1,
            width : 70,
            height : 15,
            margin : 15,
            x : 0,
            y : 0,
            color : "black",
            status : 1
        };
        wall.tab[c][r] = brick;
    }
}
let score = 0;

const random = (limit) => {
    let num = Math.round(Math.random()*limit);
    if(limit<5 && num<2) num++;
    return num
}
const setColor = (r = -1, g = -1, b = -1) => {
    let color = {r : 0, g : 0, b : 0};
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

const brickCollision = (params) => {
    let brickDestroyed = false;
    // from BELOW
    if(ball.y - ball.radius < params.y + params.height) {
        if(ball.x + ball.radius > params.x
            && ball.x - ball.radius < params.x + params.width
            && ball.y + ball.radius > params.y
            ) {
            ball.dy = -ball.dy;
            brickDestroyed = true;
            console.log("BELOW");
        }
    }
    // from ABOVE
    else if(ball.y + ball.radius > params.y) {
        if(ball.x + ball.radius > params.x
            && ball.x - ball.radius < params.x + params.width
            && ball.y - ball.radius < params.y + params.height
            ) {
            ball.dy = -ball.dy;
            brickDestroyed = true;
            console.log("ABOVE");
        }
    }
    // from LEFT SIDE
    else if(ball.x + ball.radius > params.x) {
        if(ball.y + ball.radius > params.y
            && ball.x - ball.radius < params.x + params.width
            && ball.y - ball.radius < params.y + params.height
            ) {
            ball.dx = -ball.dx;
            brickDestroyed = true;
            console.log("LEFT SIDE");
        }
    }
    // from RIGHT SIDE
    else if(ball.x - ball.radius < params.x + params.width) {
        if(ball.y + ball.radius > params.y
            && ball.x + ball.radius > params.x
            && ball.y - ball.radius < params.y + params.height
            ) {
            ball.dx = -ball.dx;
            brickDestroyed = true;
            console.log("RIGHT SIDE");
        }
    }

    if(brickDestroyed) {
        brickDestroyed = false;
        ball.color = setColor();
        params.status = 0;
        if(params.id < 10)
        console.log(`! Brick number "0${params.id}" has been destroyed !`);
        else
        console.log(`! Brick number "${params.id}" has been destroyed !`);
    }
}
const drawBricks = (params) => {
    context.beginPath();
    context.rect(params.x, params.y, params.width, params.height);
    context.fillStyle = params.color;
    context.fill();
    context.closePath();
}
const setWall = () => {
    for(let c = 0; c < wall.column; c++) {
        for(let r = 0; r < wall.row; r++) {
            let b = wall.tab[c][r];
            if (b.status == 1) {
                b.x = c * (b.width + b.margin) + wall.marginLeft;
                b.y = r * (b.height + b.margin) + wall.marginTop;
                b.color = setColor(255-b.y, 0, b.y);
                drawBricks(b);
                // console.log(b.id);
                brickCollision(b);
            }
        }
    }
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
    if(paddle.right && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.step;
    }
    else if(paddle.left && paddle.x > 0) {
        paddle.x -= paddle.step;
    }
}
const drawPaddle = () => {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.fillStyle = paddle.color;
    context.fill();
    context.closePath();
}

const gameoverOrNot = () => {
    // PADDLE
    if(ball.y + ball.radius > paddle.y
        && ball.y < paddle.y + paddle.height
        && ball.x + ball.radius > paddle.x
        && ball.x - ball.radius < paddle.x + paddle.width
        ) {
        ball.dy = ball.dy %2 == 0 ? -random(3) : -random(4);
        // console.log("dy => paddle :", ball.dy);
        ball.color = setColor(255, 0, 0);
    }
    // CANVAS
    else if(ball.y + ball.radius > canvas.height) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
    }
}
const bounce = () => {
    // UP
    if(ball.y < ball.radius) {
        ball.dy = ball.dy %2 == 0 ? random(3) : random(4);
        // console.log("dy => up :", ball.dy);
        ball.color = setColor();
    }
    // LEFT
    else if(ball.x < ball.radius) {
        ball.dx = ball.dx %2 == 0 ? random(3) : random(4);
        // console.log("dx => left :", ball.dx);
        ball.color = setColor();
    }
    // RIGHT
    else if(ball.x > canvas.width - ball.radius) {
        ball.dx = ball.dx %2 == 0 ? -random(3) : -random(4);
        // console.log("dx => right :", ball.dx);
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
    setWall();
    ball.x += ball.dx;
    ball.y += ball.dy;
}
let interval = setInterval(draw, 10);
// draw();