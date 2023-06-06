"use strict";

// Identification des champs de vérification lors de la saisie d'un mot de passe pour l'inscription d'un utilisateur
let champCreaMdp = document.getElementById("mdp");
let champConfirmMdp = document.getElementById("confirmMdp");
let critMdp1 = document.getElementById("critLettreMaj");
let critMdp2 = document.getElementById("critLettreMin");
let critMdp3 = document.getElementById("critChiffre");
let critMdp4 = document.getElementById("critNbMin");


// si l'utilisateur commence à saisir des caractères dans le champ de saisie du mot de passe
champCreaMdp.onkeyup = function(){
    // validation de la lettre majuscule
    let lettresMajuscules = /[A-Z]/g;
    if(champCreaMdp.value.match(lettresMajuscules)){
        critMdp1.classList.remove("critInvalide");
        critMdp1.classList.add("critValide");
    } else {
        critMdp1.classList.remove("critValide");
        critMdp1.classList.add("critInvalide");
    }

    // validation de la lettre minuscule
    let lettresMinuscules = /[a-z]/g;
    if(champCreaMdp.value.match(lettresMinuscules)){
        critMdp2.classList.remove("critInvalide");
        critMdp2.classList.add("critValide");
    } else {
        critMdp2.classList.remove("critValide");
        critMdp2.classList.add("critInvalide");
    }

    // validation du chiffre
    let chiffres = /[0-9]/g;
    if(champCreaMdp.value.match(chiffres)){
        critMdp3.classList.remove("critInvalide");
        critMdp3.classList.add("critValide");
    } else {
        critMdp3.classList.remove("critValide");
        critMdp3.classList.add("critInvalide");
    }

    // validation du nombre minimal de caractères (8)
    if(champCreaMdp.value.length >= 8){
        critMdp4.classList.remove("critInvalide");
        critMdp4.classList.add("critValide");
    } else {
        critMdp4.classList.remove("critValide");
        critMdp4.classList.add("critInvalide");
    }

    verifMdp();
}

// si l'utilisateur commence à saisir des caractères dans le champ de confirmation du mot de passe
champConfirmMdp.onkeyup = function(){
    verifMdp();
}

// Fonction permettant de réactiver le bouton si le mot de passe saisi contient tous les critères
function verifMdp(){
    let nbCritValides = document.getElementsByClassName("critValide").length;
    let boutonValide = document.getElementById("boutonValidationInscription");
    if(nbCritValides == 4 && champConfirmMdp.value.length>0){
        boutonValide.style.display = "block";
    } else{
        boutonValide.style.display = "none";
    }
}

// Fonction permettant de rendre visible les chamsp de saisie de mots de passe si l'on clique sur l'icône oeil du champ
function afficheMdp(nbOeil){
    let champ = document.getElementsByClassName("champMdp")[nbOeil-1];
    let iconeOeil = document.getElementsByClassName("oeil")[nbOeil-1];
    iconeOeil.classList.toggle('fa-eye');
    iconeOeil.classList.toggle('fa-eye-slash');
    if(iconeOeil.classList.contains('fa-eye')){
       champ.setAttribute("type","text");
    } else {
        champ.setAttribute("type", "password");
    }

    if(nbOeil==1){
        champ.blur();
    }
}