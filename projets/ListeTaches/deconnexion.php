<?php 
    session_start();
    if(!isset($_SESSION['utilisateur'])){
        // si la connexion de l'utilisateur n'a pas bien été établie, on le redirige vers la page de connexion
        header("location:index.php");
    }
    // destruction des sessions existantes
    session_destroy();
    // on revient ensuite à l'écran de départ
    header("location:index.php");
?>