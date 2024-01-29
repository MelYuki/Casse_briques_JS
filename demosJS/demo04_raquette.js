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
// __________________________________________________________________________
// #endregion

// CODE FACTORISÉ par rapport à la demo 03 !
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
// 1) Création d'une raquette
let paddleWidth = 60;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight * 3;
let paddleStep = 5;
// 4) Stocker l'état des flèches gauche et droite du clavier pour guider la raquette
let leftPressed = false;
let rightPressed = false;

// 6) Création de la fonction qui gère l'appui sur les touches et modifie les variables d'état
const keyDownHandler = (event) => {
    if (event.key == "Right" || event.key == "ArrowRight") rightPressed = true;
    else if (event.key == "Left" || event.key == "ArrowLeft") leftPressed = true;
}

// 7) Création de la fonction qui gère le relâchement des touches et modifie les variables d'état
const keyUpHandler = (event) => {
    if (event.key == "Right" || event.key == "ArrowRight") rightPressed = false;
    else if (event.key == "Left" || event.key == "ArrowLeft") leftPressed = false;
}

// 5) Mise en place de 2 "Listener" pour être informé des appuis sur les touches
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// 8) Faire bouger la raquette à chaque intervalles en fonction de l'état des touches et limiter ses déplacement dans le cadre sans le dépasser
const movePaddle = () => {
    if (rightPressed) {
        paddleX += paddleStep;
        // Pour éviter que la raquette ne sorte du cadre
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPressed) {
        paddleX -= paddleStep;
        // Pour éviter que la raquette ne sorte du cadre
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
}

// 2) Préparer la raquette
const drawPaddle = () => {
    context.beginPath();
    context.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
}

const bounce = () => {
    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) dy = -dy;
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
    // 3) Dessiner la raquette
    drawPaddle();
    // 9) Permettre le déplacement de la raquette
    movePaddle();
    x += dx
    y += dy
}

setInterval(draw, 10);