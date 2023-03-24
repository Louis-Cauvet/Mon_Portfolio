"use strict";  

var policeTape = new Typed(".typing", {
    strings:["étudiant en informatique","alternant en développement web","ravi de vous voir ici !"],
    typeSpeed:120,
    BackSpeed:100,
    loop:true
})

function afficherMenu(){
    let burger = document.getElementById("burgerMenu");
    if(burger.classList.contains("active")){
        burger.classList.remove('active');
        zoneMenu.style.transform = "translateX(0px)";
    } else{
        burger.classList.add('active');
        let zoneMenu = document.getElementById("zoneMenu");
        zoneMenu.style.transform = "translateX(225px)";
        zoneMenu.addEventListener("mouseleave", () => {
            zoneMenu.style.transform = "translateX(0px)";
            burger.classList.remove('active');
        })
    }
}

function changerRubrique(indiceRubrique){

    for(let i=1;i<5;i++){
        let idLogo = "logoRubrique"+i;
        let logoRubrique = document.getElementById(idLogo);
        if(logoRubrique.classList.contains("switchCouleur")){
            logoRubrique.classList.remove("switchCouleur");
        }

        let idRubrique = "rubrique"+i;
        let rubrique = document.getElementById(idRubrique);
        if(rubrique.classList.contains("switchCouleur")){
            rubrique.classList.remove("switchCouleur");
        }
    }
    
    let idNvLogo = "logoRubrique"+indiceRubrique;
    let logoNvRubrique = document.getElementById(idNvLogo);
    logoNvRubrique.classList.add("switchCouleur");

    let idNvNom = "rubrique"+indiceRubrique;
    let nomNvRubrique = document.getElementById(idNvNom);
    nomNvRubrique.classList.add("switchCouleur");


    let contenuRubriqueAccueil = document.getElementById("zonePresentation");
    contenuRubriqueAccueil.style.display = "none";
    let contenuRubriqueAPropos = document.getElementById("zoneAPropos");
    contenuRubriqueAPropos.style.display = "none";
    let contenuRubriqueProjets = document.getElementById("zoneProjets");
    contenuRubriqueProjets.style.display = "none";
    let contenuRubriqueContact = document.getElementById("zoneContact");
    contenuRubriqueContact.style.display = "none";

    switch(indiceRubrique){
        case 1 :
            contenuRubriqueAccueil.style.display = "flex";
            break;
        case 2 :
            contenuRubriqueAPropos.style.display = "block";
            afficherLignesChrono(0);
            break; 
        case 3 :
            contenuRubriqueProjets.style.display = "block";
            break;
        case 3 :
            contenuRubriqueProjets.style.display = "block";
            break;
        default :
            contenuRubriqueContact.style.display = "block";
    }

}

function afficherParametres(){
    let zoneParametres = document.getElementById("zonePersonalisation");
    zoneParametres.style.transform = "translateX(-210px)";
    zoneParametres.addEventListener("mouseleave", () => {
        zoneParametres.style.transform = "translateX(0px)";
    })
}

function changerLuminosite(){
    let iconeJourNuit = document.getElementById("iconeJourNuit");     
    iconeJourNuit.classList.toggle('fa-moon');                        
    iconeJourNuit.classList.toggle('fa-sun');
    
    const baliseRacine = document.getElementsByTagName("html")[0];
    baliseRacine.classList.toggle("nuit");

    if(iconeJourNuit.classList.contains('fa-moon')){
        document.getElementById("logoGithub").src="img/logoGithub_blanc.png";
    } else if(iconeJourNuit.classList.contains('fa-sun')){
        document.getElementById("logoGithub").src="img/logoGithub.png";
    }
}

function changerCouleur(couleur){
    const racine = document.querySelector(':root');
    switch (couleur){
        case 'rouge':
            racine.style.setProperty('--couleurVariable', '#F32819');
            break;
        case 'orange':
            racine.style.setProperty('--couleurVariable', '#E26506');
            break;
        case 'vert':
            racine.style.setProperty('--couleurVariable', '#179681');
            break;
        case 'bleu':
            racine.style.setProperty('--couleurVariable', '#0A49A7');
            break;
        case 'violet':
            racine.style.setProperty('--couleurVariable', '#C319D0');
            break;
   }
}

function afficherLignesChrono(indice){
    let ligneChronoExperience = document.getElementById("ligneChronologiqueExperiences");
    ligneChronoExperience.style.removeProperty("height");
    let hauteurZoneExperience = document.getElementById("presentationExperiences").clientHeight-indice;
    ligneChronoExperience.style.setProperty("height", hauteurZoneExperience+"px");

    let ligneChronoFormation = document.getElementById("ligneChronologiqueFormations");
    ligneChronoFormation.style.removeProperty("height");
    let hauteurZoneFormation = document.getElementById("presentationFormations").clientHeight-indice;
    ligneChronoFormation.style.setProperty("height", hauteurZoneFormation+"px");
}

function changerImageCarroussel(indiceBouton){

    let zoneImgCarroussel = document.getElementById("imageCarroussel");
    let zoneTexteCarroussel = document.getElementById("descriptionCarroussel");
    let zoneLienCarroussel = document.getElementById("lienCarroussel");


    let ancienBoutonActif = document.getElementsByClassName("pointActif")[0];
    ancienBoutonActif.classList.remove("pointActif");
    let nouveauBoutonActive = document.getElementById("pointNavig"+indiceBouton);
    nouveauBoutonActive.classList.add('pointActif');

    switch (indiceBouton){
        case 1:
            zoneImgCarroussel.setAttribute('style', "background-image: url(img/capturePokedex.png);");
            zoneTexteCarroussel.innerHTML = "Réalisation d'un Pokedex recensant tous les pokemons existants. Ce projet m'a notamment permis de mettre en application la récupération de données d'une API, et leur traitement afin de les afficher selon les besoins.";
            zoneLienCarroussel.href = "projets/Pokedex/pokedex.html";
            zoneLienCarroussel.style.visibility = "visible";
            break;
        case 2:
            zoneImgCarroussel.setAttribute('style', "background-image: url(img/captureTodoListe.png);");
            zoneTexteCarroussel.innerHTML = "Réalisation d'une liste de tâches dans laquelle on peut ajouter des tâches et en supprimer. Ce projet m'a notamment permis de mettre en application la gestion de données dans le local storage de la page web.";
            zoneLienCarroussel.href = "projets/TodoListe/todoListe.html";
            zoneLienCarroussel.style.visibility = "visible";
            break;
        case 3:
            zoneImgCarroussel.setAttribute('style', "background-image: url(img/captureCalculatrice.png);");
            zoneTexteCarroussel.innerHTML = "Réalisation d'une calculatrice. Ce projet m'a notamment permis de mettre en application la manipulation de variables, et la gestion de l'affichage du résultat.";
            zoneLienCarroussel.href = "projets/Calculatrice/calculatrice.html";
            zoneLienCarroussel.style.visibility = "visible";
            break;
        case 4:
            zoneImgCarroussel.setAttribute('style', "background-image: url(img/capturePortfolio.png);");
            zoneTexteCarroussel.innerHTML = "Réalisation de mon portfolio sur lequel vous vous trouvez actuellement.";
            zoneLienCarroussel.style.visibility = "hidden";
            break;
        default:
            zoneImgCarroussel.setAttribute('style', "background-image: url(img/capturePokedex.png);");
            zoneTexteCarroussel.innerHTML = "Création d'un Pokedex recensant tous les pokemons existants. Ce projet m'a notamment permis de découvrir comment récupérer les données d'une API et comment les exploiter afin de les afficher selon les besoins."
            zoneLienCarroussel.href = "projets/Pokedex/pokedex.html"
    }
}

let flecheGaucheCarroussel = document.getElementById("navigGauche");
let flecheDroiteCarroussel = document.getElementById("navigDroite");
let compteurImgCarroussel = 1;

flecheGaucheCarroussel.addEventListener("click", () => {
    if(compteurImgCarroussel == 1){
        compteurImgCarroussel = 5;
    } 
    changerImageCarroussel(compteurImgCarroussel-1);
    compteurImgCarroussel = compteurImgCarroussel-1;
});

flecheDroiteCarroussel.addEventListener("click", () => {
    if(compteurImgCarroussel == 4){
        compteurImgCarroussel = 0;
    } 
    changerImageCarroussel(compteurImgCarroussel+1);
    compteurImgCarroussel = compteurImgCarroussel+1;
});


afficherLignesChrono(0);

window.addEventListener('resize', () => {
    afficherLignesChrono(30);
}); 
