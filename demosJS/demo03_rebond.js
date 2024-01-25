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
// __________________________________________________________________________
// #endregion

// CODE FACTORISÉ par rapport à la demo 02 !
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
// 1) Une nouvelles variable pour la détection de collisions
let ballRadius = 10;

const drawBall = () => {
    context.beginPath();
    // 2) on utilise notre nouvelle variable
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
}

const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    // 3) Conditions et Comparaisons des valeurs d'espace pour délimiter la zone de collisions
    // gestion des limites,
    // de haut (0 + le rayon de la balle) || en bas (la hauteur - le rayon)
    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        // 4) Faire changer la balle de direction en rendant la variable égale à son inverse
        dy = -dy;
    }
    // de gauche (0 + le rayon de la balle) || à droite (la largeur - le rayon)
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        // 4) Idem
        dx = -dx;
    }

    x += dx
    y += dy
}

setInterval(draw, 10);