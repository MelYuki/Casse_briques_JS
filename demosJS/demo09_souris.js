// #region INFOS / RESSOURCES
// __________________________________________________________________________
// CSS
// https://developer.mozilla.org/fr/docs/Web/CSS/:hover
// https://developer.mozilla.org/fr/docs/Web/CSS/cursor

// Méthodes de la balise HTML <canvas>
// getContext()
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
// rect()
// https://www.w3schools.com/jsref/canvas_rect.asp
// arc()
// https://www.w3schools.com/tags/canvas_arc.asp
// fill()
// https://www.w3schools.com/jsref/canvas_fill.asp
// stroke()
// https://www.w3schools.com/jsref/canvas_stroke.asp
// clearRect()
// https://www.w3schools.com/jsref/canvas_clearrect.asp
// fillText()
// https://www.w3schools.com/graphics/canvas_text.asp

// JAVASCRIPT
// La balise HTML <script>
// https://www.w3schools.com/tags/tag_script.asp
// Les variables
// https://www.w3schools.com/js/js_variables.asp
// https://github.com/MelYuki/JavaScript/blob/main/demoConstantesVariables.js
// DOM
// https://www.w3schools.com/js/js_htmldom.asp
// fonction flechée "const name = ( params ) => { instructions }"
// https://www.w3schools.com/js/js_arrow_function.asp
// l'objet "Math"
// https://www.w3schools.com/jsref/jsref_obj_math.asp
// setInterval()
// https://www.w3schools.com/jsref/met_win_setinterval.asp
// condition "if"
// https://www.w3schools.com/js/js_if_else.asp
// les opérateurs
// https://github.com/MelYuki/JavaScript/blob/main/demoOperateurs.js
// Boolean
// https://www.w3schools.com/js/js_booleans.asp
// Events
// https://www.w3schools.com/jsref/dom_obj_event.asp
// Listener "addEventListener()"
// https://www.w3schools.com/jsref/met_document_addeventlistener.asp
// key & keyCode
// https://www.w3schools.com/jsref/event_key_key.asp
// https://www.w3schools.com/jsref/event_key_keycode.asp
// alert()
// https://www.w3schools.com/jsref/met_win_alert.asp
// location
// https://www.w3schools.com/js/js_window_location.asp
// reload()
// https://www.w3schools.com/jsref/met_loc_reload.asp
// clearInterval()
// https://www.w3schools.com/jsref/met_win_clearinterval.asp
// Tableaux
// https://www.w3schools.com/jsref/jsref_obj_array.asp
// Tableau à 2 dimensions
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array#cr%C3%A9er_un_tableau_%C3%A0_deux_dimensions
// Boucle "for"
// https://www.w3schools.com/js/js_loop_for.asp
// MouseEvent
// https://developer.mozilla.org/fr/docs/Web/API/MouseEvent
// mousemove
// https://www.w3schools.com/jsref/event_onmousemove.asp
// clientX
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX
// clientY
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY
// __________________________________________________________________________
// #endregion

let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 40;
let dx = 2;
let dy = -2;
let ballRadius = 7.5;

let paddleWidth = 60;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight * 3;
let paddleStep = 7;
let leftPressed = false;
let rightPressed = false;

let brickRowCount = 5;
let brickColumnCount = 7;
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

let score = 0;

const drawScore = () => {
    context.font = "16px Arial";
    context.fillStyle = "black";
    context.fillText(`Score : ${score}`, 10, 20);
}

const drawBricks = () => {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricksTab[c][r];
            if (b.status == 1) {
                let brickX = c * (brickWidth + brickPadding) + brickMarginLeft;
                let brickY = r * (brickHeight + brickPadding) + brickMarginTop;
                b.x = brickX;
                b.y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = "black";
                context.fill();
                context.closePath();
            }
        }
    }
}

const win = () => {
    if (score == brickColumnCount * brickRowCount) {
        alert("!!! C'est GAGNÉ !!!");
        document.location.reload();
        clearInterval(interval);
    }
}

const collisionDectection = () => {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricksTab[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    win();
                }
            }
        }
    }
}

const keyDownHandler = (e) => {
    if (e.key == "Right" || e.key == "ArrowRight") rightPressed = true;
    else if (e.key == "Left" || e.key == "ArrowLeft") leftPressed = true;
}

const keyUpHandler = (e) => {
    if (e.key == "Right" || e.key == "ArrowRight") rightPressed = false;
    else if (e.key == "Left" || e.key == "ArrowLeft") leftPressed = false;
}

// 2) Et une fonction associées
const mouseMoveHandler = (e) => {
    // On calcul d'abord les positions relatives de la souris en faisant:
    // la position horizontale de la souris dans la fenêtre du navigateur (e.clientX)
    // MOINS la distance entre le bord gauche de la fenêtre et le bord gauche du canvas (canvas.offsetLeft)
    let relativeX = e.clientX - canvas.offsetLeft;
    // la position verticale de la souris dans la fenêtre du navigateur (e.clientY)
    // MOINS la distance entre le bord du haut de la fenêtre et le bord du haut du canvas (canvas.offsetTop)
    let relativeY = e.clientY - canvas.offsetTop;

    // On délimite la zone d'action de la souris pour la gestion de la raquette
    if (relativeX > 0 && relativeX < canvas.width && relativeY > 0 && relativeY < canvas.height) {
        // On modifie la position X de la raquette à chaque mouvement de la souris
        paddleX = relativeX - paddleWidth / 2;

        // Dans le CSS, faire disparaitre la souris du canvas
    }
}

// Pour manipuler la raquette avec la souris nous allons,
// 1) créer un 3ème "Listener"
document.addEventListener("mousemove", mouseMoveHandler, false);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

const movePaddle = () => {
    if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += paddleStep;
    else if (leftPressed && paddleX > 0) paddleX -= paddleStep;
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
    if (y + dy < ballRadius) dy = -dy;
    gameoverOrNot()
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) dx = -dx;
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
    drawBricks();
    collisionDectection();
    drawScore();
    x += dx
    y += dy
}

let interval = setInterval(draw, 10);