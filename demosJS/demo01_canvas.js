// #region INFOS / RESSOURCES
// __________________________________________________________________________
// Méthodes de la balise HTML <canvas>
// rect()
// https://www.w3schools.com/jsref/canvas_rect.asp
// arc()
// https://www.w3schools.com/tags/canvas_arc.asp

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
// __________________________________________________________________________
// #endregion

// Récupération de l'élément HTML
let canvas = document.getElementById("myCanvas");
// Déclaration du "context" dans lequel on utilisera l'élément, ce qui nous permettra de dessiner à l'intérieur.
let context = canvas.getContext("2d");

// Création de la fonction qui dessine un rectangle
const drawRect = () => {
    // ouverture
    context.beginPath();
    // définition d'un rectangle:
        // les 2 premières valeurs spécifient les coordonnées du coin supérieur gauche
        // les 2 autres donnent la largeur et la hauteur
    context.rect(20, 40, 150, 75);
    // stockage d'une couleur que la méthode "fill()" utilisera
    context.fillStyle = "black";
    // peinte du rectangle
    context.fill();
    // Pour définir un rectangle vide mais spécifier la couleur des bordures
    context.strokeStyle = "rgba(255, 0, 0, 1)";
    // coloration des contours
    context.stroke();
    // fermeture
    context.closePath();
}
// Appel de la fonction
drawRect()

// Création de la fonction qui dessine un cercle
const drawArc = () => {
    context.beginPath();
    // définition d'un cercle:
        // les 2 premières valeurs spécifient les coordonnées du centre de cercle
        // la 3ème donne le rayon du cercle
        // la 4ème donne l'angle de départ (du dessin en radiant)
        // la 5ème donne l'angle de fin (du dessin en radiant)
        // la 6ème le sens du dessin (false(défaut) = horlogique, true = anti-horlogique)
    context.arc(260, 190, 40, 0, Math.PI * 2, false);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
}
// Appel de la fonction
drawArc()