<?php
    // on récupère l'identifiant de la tâche qui est dans l'url de la page
    $idT = $_GET['id'];
    // on se connecte à la base de données pour ensuite effectuer la suppression de la tâche
    include "connexion_bdd.php";
    supprimerTache($idT);
?>