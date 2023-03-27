"use strict";

let pokemonActuel = 1;

// on identifie les différents champs qui seront modifiés avec les données de l'api
let pokeNum = document.getElementById("numPokemon");
let pokeImg = document.getElementById("imagePokemon");
let pokeImgShiny = document.getElementById("imageShinyPokemon");
let pokeName = document.getElementById("nomPokemon");
let pokeType1 = document.getElementById("type1");
let pokeType2 = document.getElementById("type2");
let pokeAbility1 = document.getElementById("capaciteSpe1");
let pokeAbility2 = document.getElementById("capaciteSpe2");

const chargerListePokedex = async() =>{
    for (let i=1; i<1009; i++){
        // on prépare la requete à effectuer pour récupérer les données 
        let requeteApiListe = 'https://pokeapi.co/api/v2/pokemon/'+i;

        // on envoie la requete, puis on attend sa réponse
        let donneesListe = await fetch(requeteApiListe);

        // on récupère la réponse de la requête une fois qu'elle est prête
        let reponse = await donneesListe.json();
        
        // création de la balise <div> qui correspond à un nouveau pokemon dans la liste
        const nvPokemon = document.createElement('div');      
        nvPokemon.className = "pokemonListe";   
        nvPokemon.textContent = "#"+i+" "+reponse.name.charAt(0).toUpperCase()+reponse.name.substr(1);   
        nvPokemon.addEventListener("click", () => {
            afficherPokemon(i);
        });                       
        let listePokedex = document.getElementById("zoneListePokemon"); 
        listePokedex.append(nvPokemon);                              
    }
}

const afficherPokemon = async(index) =>{
    // on prépare la requete à effectuer pour récupérer les données à l'aide de l'url de l'API qu'on utilise
    let requeteApiPoke = 'https://pokeapi.co/api/v2/pokemon/'+index;
    
    // on envoie la requete, puis on attend sa réponse
    let donneesPokemon = await fetch(requeteApiPoke);

    // on convertit la requête au format json
    let reponse = await donneesPokemon.json();
    console.log(reponse);

    // on affiche les données dans les différents champs correspondants
    pokeNum.textContent = "#"+reponse.id;         
    pokeImg.src = reponse.sprites.front_default;    
    if(reponse.sprites.front_shiny == null){
        pokeImgShiny.style.display = "none";
    } else {
        pokeImgShiny.src = reponse.sprites.front_shiny;
        pokeImgShiny.style.display = "block";
    }

    pokeName.textContent = reponse.name;

    pokeType1.textContent = reponse.types[0].type.name;
    if(reponse.types.length == 2){
        pokeType2.textContent = reponse.types[1].type.name;
    } else{
        pokeType2.textContent="";
    }
    changerCouleurType(pokeType1.textContent, pokeType1);
    changerCouleurType(pokeType2.textContent, pokeType2);

    pokeAbility1.textContent = reponse.abilities[0].ability.name;
    if(reponse.abilities.length == 2 && reponse.abilities[0].ability.name != reponse.abilities[1].ability.name){
        pokeAbility2.textContent = reponse.abilities[1].ability.name;
    } else{
        pokeAbility2.textContent="";
    }

    pokemonActuel = index;
}

const chargerPresentationPokedex = async() =>{
    for (let i=1; i<1009; i++){
        // on prépare la requete à effectuer pour récupérer les données 
        let requeteApiListe = 'https://pokeapi.co/api/v2/pokemon/'+i;

        // on envoie la requete, puis on attend sa réponse
        let donneesListe = await fetch(requeteApiListe);

        // on récupère la réponse de la requête une fois qu'elle est prête
        let reponse = await donneesListe.json();

        let presentationPokedex = document.getElementById("zonePresentationPokemons"); 
        
        // création de la balise <div> qui correspond à un nouveau pokemon dans la liste
        const pokePresenter = document.createElement('div');    
        pokePresenter.className = "presentationPokemon";                         
        presentationPokedex.append(pokePresenter);  
        
        const numPokePresenter = document.createElement('div'); 
        numPokePresenter.className = "numPresentationPokemon"; 
        numPokePresenter.textContent = "#"+reponse.id;  
        pokePresenter.append(numPokePresenter);  

        const imgPokePresenter = document.createElement('img'); 
        imgPokePresenter.className = "imagePresentationPokemon"; 
        imgPokePresenter.src = reponse.sprites.front_default;  
        pokePresenter.append(imgPokePresenter); 

        if(reponse.sprites.front_shiny != null){
            const imgPokeShinyPresenter = document.createElement('img'); 
            imgPokeShinyPresenter.className = "imagePresentationPokemonShiny"; 
            imgPokeShinyPresenter.src = reponse.sprites.front_shiny; 
            pokePresenter.append(imgPokeShinyPresenter); 
        } 

        const typesPokePresenter = document.createElement('div'); 
        typesPokePresenter.className = "typesPresentationPokemon"; 
        pokePresenter.append(typesPokePresenter);

        const type1PokePresenter = document.createElement('div');
        type1PokePresenter.className = "typePresentationPokemon"; 
        type1PokePresenter.textContent = reponse.types[0].type.name;
        changerCouleurType(type1PokePresenter.textContent, type1PokePresenter);
        typesPokePresenter.append(type1PokePresenter);

        const type2PokePresenter = document.createElement('div');
        type2PokePresenter.className = "typePresentationPokemon"; 
        if(reponse.types.length == 2){
            type2PokePresenter.textContent = reponse.types[1].type.name;
            changerCouleurType(type2PokePresenter.textContent, type2PokePresenter);
        }
        typesPokePresenter.append(type2PokePresenter);
        
        const nomPokePresenter = document.createElement('div'); 
        nomPokePresenter.className = "nomPresentationPokemon"; 
        nomPokePresenter.textContent =  reponse.name; 
        pokePresenter.append(nomPokePresenter); 
        
    }
}

function effectuerRecherche(){
    let idRecherche = document.getElementById("champSaisie").value;
    if(idRecherche<1 || idRecherche>1008){
        alert("Ce nombre n'existe pas dans le pokedex !");
        document.getElementById("champSaisie").value= "";
    } else{
        let idString = parseInt(idRecherche);
        afficherPokemon(idString);
        document.getElementById("champSaisie").value= "";
    }
}

function pokePrecedent(){
    pokemonActuel = pokemonActuel-1;
    if(pokemonActuel==0){
        pokemonActuel = 1008;
    }
    afficherPokemon(pokemonActuel);
}

function pokeSuivant(){
    pokemonActuel = pokemonActuel+1;
    if(pokemonActuel==1009){
        pokemonActuel = 1;
    }
    afficherPokemon(pokemonActuel);
}

function changerCouleurType(typePoke, zoneChange){
    switch (typePoke){
        case 'normal':
            zoneChange.style.backgroundColor = '#9A966A';
            break;
        case 'fighting':
            zoneChange.style.backgroundColor = '#A5322C';
            break;
        case 'flying':
            zoneChange.style.backgroundColor = '#967EE0';
            break;
        case 'poison':
            zoneChange.style.backgroundColor = '#8B2F88';
            break;
        case 'ground':
            zoneChange.style.backgroundColor = '#CBA854';
            break;
        case 'rock':
            zoneChange.style.backgroundColor = '#AB8E2A';
            break;
        case 'bug':
            zoneChange.style.backgroundColor = '#96A81E';
            break; 
        case 'ghost':
            zoneChange.style.backgroundColor = '#5D4882';
            break;
        case 'steel':
            zoneChange.style.backgroundColor = '#ABA8C8';
            break;
        case 'fire':
            zoneChange.style.backgroundColor = '#FF6833';
            break;
        case 'water':
            zoneChange.style.backgroundColor = '#5581EB';
            break;
        case 'grass':
            zoneChange.style.backgroundColor = '#66C03D';
            break;
        case 'electric':
            zoneChange.style.backgroundColor = '#F3C41E';
            break;
        case 'psychic':
            zoneChange.style.backgroundColor = '#FF3D73';
            break;
        case 'ice':
            zoneChange.style.backgroundColor = '#86CFCD';
            break;
        case 'dragon':
            zoneChange.style.backgroundColor = '#5B28F6';
            break;
        case 'dark':
            zoneChange.style.backgroundColor = '#634838';
            break;
        case 'fairy':
            zoneChange.style.backgroundColor = '#D792DA';
            break;
        case "":
            zoneChange.style.backgroundColor = '#FFFFFF';
            break;
    }
}

chargerPresentationPokedex();
chargerListePokedex();
afficherPokemon(pokemonActuel);