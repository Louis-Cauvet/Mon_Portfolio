"use strict";

let calcul = "";               // chaine de caractères recevant au fil des clics le calcul à effectuer
let resultat = 0;              // resultat renvoyé par la calculatrice


/* Fonction permettant de remettre la calculatrice dans son état de base */
function reinitialiserAffichage(){   
    calcul = "";                                                     // on nettoie le contenu de la variable "calcul"
    document.getElementById("affichage").innerHTML = calcul;
}

/* Fonction intervenant lors du clic sur une touche de la calculatrice, le param "char" correspond au caractère de la touche cliquée */
function insererCaract(char){
    // nettoie l'affichage si l'on commence un nouveau calcul après avoir affiché un résultat
    if (resultat != 0){                                          
        calcul = "";
        document.getElementById("affichage").innerHTML = calcul;
        resultat = 0;
    }

    // on vérifie que le nombre max de caractères (20) n'est pas atteint
    if (calcul.length < 20){                                     
        let caractere = document.getElementById(char).textContent;
        calcul += caractere;
        document.getElementById("affichage").innerHTML = calcul;
    } else {
        window.alert("Le nombre maximal de caractères (20) est atteint !!")
    }
}

/* fonction permettant d'affiche le résultat du calcul */
function afficherResultat(){
    // on effectue le calcul à partir de la chaine de caractères "calcul" à l'ide de eval()
    resultat = eval(calcul);
    document.getElementById("affichage").innerHTML = "Résultat : "+resultat;
    let texteAffich =  document.getElementById("affichage").textContent;
    // si le résultat est trop grand pour tenir dans la partie affichage, on l'arrondit à 4 chiffres après la virgule
    if(texteAffich.length > 18){
        let resultArrondi = resultat.toFixed(4);
        document.getElementById("affichage").innerHTML = "Résultat : "+resultArrondi;
    }
}

/* fonction intervenant lors d'une erreur de saisie dans le calcul */
window.addEventListener('error', (e) => {
    window.alert("Une erreur est survenue dans le calcul, veuillez réessayer");
    reinitialiserAffichage();
})
