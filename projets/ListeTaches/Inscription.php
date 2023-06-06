<!DOCTYPE html>
<html lang="fr">
    <head>
        <title> Inscription Utilisateur - Louis Cauvet</title>
        <link rel="stylesheet" type="text/css" href="connexion_style.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="HTML,CSS,JS,PHP, inscription-utilisateur, base de données">
        <meta name="description" content="Page permettant l'ajout de données de connexion dans une base de données">
        <meta name="author" content="Louis Cauvet">
    </head>

    <body>
        <header>
            <a id="retourPortfolio" href="../..">Cliquez sur ce lien pour revenir à mon portfolio</a>
        </header>
        <div id="zoneInscription">
            <div id="fenetreInscription">
                <form id="formulaireInscription" action="" method="POST" autocomplete="off">
                    <fieldset id="regroupementFormulaire">
                        <legend id="titreFormulaire">Inscription</legend>
                        <div class="erreurFormulaire">
                        <?php 
                            if(isset($_POST['boutonInscription'])){      
                                // on extrait les données du formulaire
                                extract($_POST);                        
                                // on vérifie si des champs ont été laissés vides
                                if(isset($adresseMail) && isset($mdp) && isset($confirmMdp) && $adresseMail == "" || $mdp == "" || $confirmMdp == ""){
                                    // si un au moins un des champs est vide, on définit un message d'erreur à afficher        
                                    $erreurChamps = "Tous les champs sont obligatoires, veuillez les remplir !";
                                } elseif($mdp != $confirmMdp){
                                    // si les 2 mots de passe saisis ne sont pas les mêmes, on définit un autre message d'erreur à afficher       
                                    $erreurChamps = "Les 2 mots de passes saisis sont différents !";
                                } elseif(stristr($adresseMail,'@')=== FALSE|| stristr($adresseMail,".")=== FALSE){
                                    // si l'adresse mail saisie ne contient pas à la fois "@" et ".", on définit un autre message d'erreur à afficher 
                                    $erreurChamps = "L'adresse mail saisie n'est pas valide !";
                                } else {
                                    // on vérifie que les données saisies n'existent pas déjà 
                                    include "connexion_bdd.php";
                                    inscriptionUtilisateur($adresseMail,$mdp);
                                }
                            } 
                            // on affiche un message d'erreur s'il est défini
                            if(isset($erreurChamps)){
                                echo($erreurChamps);
                            }
                        ?>
                        </div>
                        <label class="labelFormulaire" for="adresseMail">Adresse mail</label>
                        <input id="adresseMail" class="champFormulaire" type="text" id="champLogin" name="adresseMail">
                        <label class="labelFormulaire" for="mdp">Mot de passe</label>
                        <label class="regroupementMdp">
                            <input id="mdp" class="champFormulaire champMdp" type="password" name="mdp">
                            <div class="iconeMdp">
                                <i class="oeil fa fa-eye-slash" onclick="afficheMdp(1)"></i>
                            </div>
                        </label>
                        <label class="labelFormulaire" for="confirmMdp">Confirmation du mot de passe</label>
                        <label class="regroupementMdp">
                            <input id="confirmMdp" class="champFormulaire champMdp" type="password" name="confirmMdp">
                            <div class="iconeMdp">
                                <i class="oeil fa fa-eye-slash" onclick="afficheMdp(2)"></i>
                            </div>
                        </label>
                        <input id="boutonValidationInscription" type="submit" value="Je valide mon inscription !" name="boutonInscription">
                    </fieldset>
                </form>
                <p id="texteConnexion">Vous avez déjà un compte ? <a id="lienConnexion" href="index.php">Connectez-vous !</a></p>
            </div>
            <div id="zoneVerifMdp">
                <div id="titreVerifMdp">
                    Le mot de passe que vous choisissez doit contenir les éléments suivants :
                </div>
                <div id="criteresMdp">
                    <div id="critLettreMaj" class="critere critInvalide">Une lettre majuscule</div>
                    <div id="critLettreMin" class="critere critInvalide">Une lettre minuscule</div>
                    <div id="critChiffre" class="critere critInvalide">Un chiffre</div>
                    <div id="critNbMin" class="critere critInvalide">8 caractères minimum</div>
                </div>
                <div id="infosDonnees"> 
                    <i class="fa fa-exclamation-circle"></i>
                    Les informations que vous saisissez sont stockées uniquement afin de vous permettre de tester le système de connexion, en aucun cas elles ne seront utilisées à d'autres fins.
                </div>
            </div>
        </div>
        <script src="connexion_script.js" type="text/javascript"></script>
        <noscript>Désolé, votre navigateur ne prend pas en charge le Javascript</noscript>
    </body>

</html>