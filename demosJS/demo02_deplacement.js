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
// Fonction flechée (const name = ( params ) => { instructions })
// https://www.w3schools.com/js/js_arrow_function.asp
// Math
// https://www.w3schools.com/jsref/jsref_obj_math.asp
// setInterval()
// https://www.w3schools.com/jsref/met_win_setinterval.asp
// __________________________________________________________________________
// #endregion

let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

// 1) De nouvelles variables pour modifier la position "bloquée" de la balle
let x = canvas.width / 2;
let y = canvas.height - 30;
// 3) Pour faire croire que la balle bouge,
// définition de 2 autres variables afin de modifier la position à chaque intervalles
let dx = 2;
let dy = -2;

const draw = () => {
    // 6) pour éffacer la trainée de la balle, il faut nettoyer le canvas à chaque intervalles
        // Les 2 premières valeurs commencent à gauche, en haut (0, 0)
        // Les 2 dernières valeurs terminent à droite, en bas (largeur du cadre, hauteur du cadre)
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    // 2) on utilise nos nouvelles variables (x, y)
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
    // 4) on modifie la position une fois le dessin effectué
    x += dx
    y += dy
}
// 5) Redessiner la balle toutes les 10 millisecondes
setInterval(draw, 10);