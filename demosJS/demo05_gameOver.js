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
// __________________________________________________________________________
// #endregion

// CODE FACTORISÉ par rapport à la demo 04 !
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 50;
let dx = 2;
let dy = -2;
let ballRadius = 10;

let paddleWidth = 60;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight * 3;
let paddleStep = 5;
let leftPressed = false;
let rightPressed = false;

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

const bounce = () => {
    // 1) Nous allons remplacer l'action de rebond en bas du cadre par :
    // - un message,
    // - un refresh,
    // - un nettoyage (arrêt) de l'intervalle /!\
    if (y + dy < ballRadius) dy = -dy;
    // 7) Il faut maintenant empêcher le GameOver par un rebond sur la raquette
    // en détectant si la balle se trouve dans l'espace (x)
    // ET sur un niveau (y) de la raquette à l'instant T
    else if (x > paddleX && x < paddleX + paddleWidth && y == paddleY) {
        dy = -dy;
    }
    // 2) GameOver: un "else if" avec la comparaison de détection au bas du cadre
    else if (y + dy > canvas.height - ballRadius) {
        // 3) On affiche notre message comme "alert()" pour l'instant
        alert("GAME OVER");
        // 4) On refresh la page (pour FIREFOX, c'est ok !)
        // "location" cible l'URL du document
        // "reload()" rehcarge la page de l'URL ciblé
        document.location.reload();
        // 6) On peut maintenant marquer un arrêt (pour GOOGLE CHROME !)
        // /!\ Si on le fait pas, on créé une boucle infinie /!\
        clearInterval(interval);
    }

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
    x += dx
    y += dy
}

// 5) Nous allons mettre ceci dans une variable
// pour pouvoir l'utiliser plus haut et "nettoyer" l'intervalle
let interval = setInterval(draw, 10);