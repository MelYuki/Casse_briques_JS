// #region INFOS / RESSOURCES
// __________________________________________________________________________
// Méthodes de la balise HTML <canvas>
// rect()
// https://www.w3schools.com/jsref/canvas_rect.asp
// arc()
// https://www.w3schools.com/tags/canvas_arc.asp
// clearRect()
// https://www.w3schools.com/jsref/canvas_clearrect.asp

// JAVASCRIPT
// Les variables
// https://www.w3schools.com/js/js_variables.asp
// https://github.com/MelYuki/JavaScript/blob/main/demoConstantesVariables.js
// DOM
// https://www.w3schools.com/js/js_htmldom.asp
// fonction flechée (const name = ( params ) => { instructions })
// https://www.w3schools.com/js/js_arrow_function.asp
// l'objet "Math"
// https://www.w3schools.com/jsref/jsref_obj_math.asp
// setInterval()
// https://www.w3schools.com/jsref/met_win_setinterval.asp
// condition "if"
// https://www.w3schools.com/js/js_if_else.asp
// les opérateurs
// https://github.com/MelYuki/JavaScript/blob/main/demoOperateurs.js
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
// __________________________________________________________________________
// #endregion

// CODE FACTORISÉ par rapport à la demo 05 !
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
let paddleStep = 5;
let leftPressed = false;
let rightPressed = false;
// 1) Création des briques
let brickRowCount = 5;
let brickColumnCount = 9;
let brickWidth = 70;
let brickHeight = 15;
let brickPadding = 10;
let brickMarginTop = 45;
let brickMarginLeft = 45;

// 2) Création d'un tableau qui contiendra les colonnes et les lignes de briques
let bricksTab = [];
// 3) Utilisation d'une boucle "for" pour créer le tableau à 2 dimensions
for (let c = 0; c < brickColumnCount; c++) {
    bricksTab[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricksTab[c][r] = {x: 0, y: 0};
    }
}

// 4) Préparer les briques
const drawBricks = () => {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let brickX = c * (brickWidth + brickPadding) + brickMarginLeft;
            let brickY = r * (brickHeight + brickPadding) + brickMarginTop;
            bricksTab[c][r].x = brickX;
            bricksTab[c][r].y = brickY;
            context.beginPath();
            context.rect(brickX, brickY, brickWidth, brickHeight);
            context.fillStyle = "black";
            context.fill();
            context.closePath();
        }
    }
}
// DEBUG AVEC UNE BOUCLE POUR BIEN COMPRENDRE CE QUI S'AJOUTE DANS LE TABLEAU ET COMMENT!
// for (let i=0;i<bricksTab.length;i++){
//     console.log(bricksTab[i])
// }

const keyDownHandler = (e) => {
    if (e.key == "Right" || e.key == "ArrowRight") rightPressed = true;
    else if (e.key == "Left" || e.key == "ArrowLeft") leftPressed = true;
}

const keyUpHandler = (e) => {
    if (e.key == "Right" || e.key == "ArrowRight") rightPressed = false;
    else if (e.key == "Left" || e.key == "ArrowLeft") leftPressed = false;
}

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
    // 5) Dessiner les briques
    drawBricks();
    x += dx
    y += dy
}

let interval = setInterval(draw, 10);