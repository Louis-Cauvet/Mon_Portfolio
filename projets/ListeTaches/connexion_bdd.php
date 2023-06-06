<?php

// démarrage du système de session-utilisateur
session_start();

$connexion = "";

// Fonction permettant d'établir une connexion à la base de données
function ouvrirBdd(){
    $servername = "localhost";
    $dbname = "bdd_portfolio_CAUVETLouis";
    $username = "lcauvet";
    $password = "Monchap2002!";
    try{
        $connexion = new PDO("mysql:host=$servername;dbname=$dbname",$username, $password);   
        $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
    } catch(PDOException $e){
        // en cas d'erreur à la connexion à la base de données
        echo('<script>console.log("la connexion a échouée :'.$e->getMessage().'");</script>');     
    }
    return $connexion;
}

// Fonction que l'on appelle lorsqu'un utilisateur souhaite se connecter
function connexionUtilisateur($mail,$mdp){
    // on demande la connexion à la base de données
    $conn = ouvrirBdd();
    // on protège le champ mail contre les injections SQL
    $mail = addslashes($mail);
    // on recherche dans la base de données si les informations saisies existent
    $requete = "SELECT * FROM utilisateurs WHERE mail_utilisateur = '$mail' AND mdp_utilisateur = '$mdp'";
    $resultat = $conn->query($requete);
    $nbRes = $resultat->rowCount();
    if($nbRes>0){
        // Création de la session utilisateur (identifiée par son mail)
        $_SESSION['utilisateur'] = $mail;
        // Fermeture de la base de données
        $conn = null;
        echo("<script>console.log('la base de données est bien refermée !');</script>"); 
        // redirection vers la page de liste de tâches
        header("location:liste_taches.php");
    } else {
        // on renvoie un message d'erreur si les informations ne sont pas trouvées dans la bdd
        echo("Les informations saisies sont incorrectes !");
        // Fermeture de la base de données
        $conn = null;
        echo("<script>console.log('la base de données est bien refermée !');</script>");
    }
}

// Fonction que l'on appelle lorsqu'un utilisateur souhaite s'inscrire dans la base de données
function inscriptionUtilisateur($mail,$mdp){
    // on demande la connexion à la base de données
    $conn = ouvrirBdd();
    // on recherche dans la base de données si le mail de l'utilisateur existe déjà
    $requete = "SELECT * FROM utilisateurs WHERE mail_utilisateur = '$mail'";
    $resultat = $conn->query($requete);
    $nbRes = $resultat->rowCount();
    if($nbRes==0){
        try{
            // on peut enregistrer les données du nouvel utilisateur dans la base de données
            $requete = "INSERT INTO utilisateurs (id_utilisateur, mail_utilisateur, mdp_utilisateur) VALUES (NULL, '$mail', '$mdp')";
            $conn->exec($requete);
            // Fermeture de la base de données
            $conn = null;
            echo("<script>console.log('la base de données est bien refermée !');</script>");
            // on crée un message de confirmation à afficher dans la page de connexion
            $_SESSION['message'] = "Votre compte a bien été créé, vous pouvez maintenant vous connecter !";
            // redirection vers la page de connexion
            header("Location:index.php");
        } catch(PDOException $e){
            // on affiche une erreur en cas de problème dans l'exécution de la requête d'insertion
            echo("<script>console.log('Une erreur s'est produite lors de l'enregistrement des données : ".$e->getMessage()."');</script>");
            // Fermeture de la base de données
            $conn = null;
        }
    } else {
        // on renvoie un message d'erreur si les informations ne sont pas trouvées dans la bdd
        echo("Le mail saisi existe déjà dans notre base de données !");
        // Fermeture de la base de données
        $conn = null;
    }
}

function afficherTachesUtilisateur($mailUtilisateur){
    // on demande la connexion à la base de données
    $conn = ouvrirBdd();    
    // on recherche dans la base de données l'identifiant correspondant au mail de l'utilisateur connecté
    $requete = "SELECT id_utilisateur FROM utilisateurs WHERE mail_utilisateur = '$mailUtilisateur'";
    $resultat = $conn->query($requete);
    $id = $resultat->fetchColumn();

    $requete2 = "SELECT texte_tache FROM taches WHERE id_utilisateur = '$id'";
    $resultat2 = $conn->query($requete2);
    $nbRes2 = $resultat2->rowCount(); 
    if($nbRes2>0){
        // on affiche pour chaque résultat trouvé dans le base la tâche dans la page web
        while($ligne = $resultat2->fetchColumn()){  
            $requete3 = 'SELECT id_tache FROM taches WHERE texte_tache ="'.$ligne.'"';
            $resultat3 = $conn->query($requete3)->fetchColumn();
            $requete4 = 'SELECT tache_finie FROM taches WHERE texte_tache ="'.$ligne.'"';
            $resultat4 = $conn->query($requete4)->fetchColumn();
            if($resultat4===0){
                // on affiche la tâche dans le cas où elle n'a pas été marquée comme achevée
                echo(
                    '<div class="tache">
                        <div class="intituleTache">'.$ligne.'</div>
                        <div class="zoneBoutonsTache"> 
                            <button class="boutonMajTache">
                                <a class="boutonMajTache" href="mettreAJourTache.php?id='.$resultat3.'">
                                    <i class="fa fa-check"></i>
                                </a>
                            </button>
                            <button class="boutonSupprimeTache">
                                <a  class="boutonSupprimeTache" href="supprimerTache.php?id='.$resultat3.'">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </button>
                        </div>
                    </div>'
                );
            } else {
                 // on affiche la tâche dans le cas où elle a été marquée comme achevée
                echo(
                    '<div class="tacheFinie">
                        <div class="intituleTache">'.$ligne.'</div>
                        <div class="zoneBoutonsTache"> 
                            <button class="boutonSupprimeTache">
                                <a  class="boutonSupprimeTache" href="supprimerTache.php?id='.$resultat3.'">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </button>
                        </div>
                    </div>'
                );
            }
        }                       
    } 
    // Fermeture de la base de données
    $conn = null;
}

function ajouterTache($contenuTache, $mailUtilisateur){
    // on demande la connexion à la base de données
    $conn = ouvrirBdd(); 
    // on recherche dans la base de données l'identifiant correspondant au mail de l'utilisateur connecté
    $requete = "SELECT id_utilisateur FROM utilisateurs WHERE mail_utilisateur = '$mailUtilisateur'";
    $resultat = $conn->query($requete);
    $id = $resultat->fetchColumn();
    try {
    $requete2 = "INSERT INTO taches (id_tache, texte_tache, tache_finie, id_utilisateur) VALUES (NULL, '".$contenuTache."', 0 , ".$id.")";
    echo("<script>console.log('".$contenuTache."');</script>");
        $conn->exec($requete2);
        // Fermeture de la base de données
        $conn = null; 
        header("location:liste_taches.php");                                          
    } catch(PDOException $e) {
        echo("<script>console.log('Impossible d'ajouter la tâche : ".$e->getMessage()."');</script>");
        // Fermeture de la base de données
        $conn = null;
    }
      
}

function supprimerTache($idTache){
    // on demande la connexion à la base de données
    $conn = ouvrirBdd(); 
    // on supprime la tâche possédant l'identifiant passé en paramètres
    try {
        $requete = "DELETE FROM taches WHERE id_tache = '".$idTache."'";       
        $conn->exec($requete);
        // Fermeture de la base de données
        $conn = null;
        // redirection vers la page de liste de tâches
        header("location:liste_taches.php");
    } catch(PDOException $e) {
        echo("<script>console.log('Impossible de supprimer la tâche : ".$e->getMessage()."');</script>");
        // Fermeture de la base de données
        $conn = null;  
    }   
}

function modifierEtatTache($idTache){
    // on demande la connexion à la base de données
    $conn = ouvrirBdd(); 
    // on modifie l'état de la tâche possédant l'identifiant passé en paramètres
    try {
        $requete = "UPDATE taches SET tache_finie=1 WHERE id_tache = '".$idTache."'";       
        $conn->exec($requete);
        // Fermeture de la base de données
        $conn = null;
        // redirection vers la page de liste de tâches
        header("location:liste_taches.php");
    } catch(PDOException $e) {
        echo("<script>console.log('Impossible de mettre à jour la tâche : ".$e->getMessage()."');</script>");
        // Fermeture de la base de données
        $conn = null;  
    }
}
?>