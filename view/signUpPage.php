<div class="main container">

    <p class="col-xs-12 sosh-black yellow text-size2_5 text-height3">
        Pour tenter de gagner
        un des lots au tirage au sort,
        complétez et validez
        le formulaire ci-dessous :
    </p>

    <form>
        <div class="col-xs-12 text-right">
            <input type="text" id="input-nom" name="nom" placeholder="Nom*"/>
            <p class="error height0">Champ obligatoire</p>

            <input type="text" id="input-prenom" name="prenom" placeholder="Prénom*"/>
            <p class="error height0">Champ obligatoire</p>

            <input type="email" id="input-email" name="email" placeholder="E-mail*"/>
            <p class="error height0">Format non valide</p>

            <input type="text" id="input-telephone" name="telephone" placeholder="Téléphone*"/>
            <p class="error height0">Format : 06xxxxxxxx</p>

            <input type="text" id="input-adresse" name="adresse" placeholder="Adresse*"/>
            <p class="error height0">Champ obligatoire</p>

            <input type="text" id="input-ville" name="ville" placeholder="Ville*"/>
            <p class="error height0">Champ obligatoire</p>

            <input type="text" id="input-code_postal" name="code_postal" placeholder="Code postal*"/>
            <p class="error height0">Champ obligatoire</p>

            <span class="sosh-regular">* Champs obligatoires</span>
        </div>

        <div class="col-xs-12 text-left">
            <span class="sosh-black">Cocher les cases suivantes :</span>
            <p class="checkbox">
                <input type="checkbox" id="checkbox-rule" name="checkbox-rule" value="rules"/>
                <label for="checkbox-rule">J'accepte le <a href="#"
                                                           target="_blank" class="underline">règlement</a>*</label>
            </p>
            <p class="checkbox">
                <input type="checkbox" id="checkbox-client" name="checkbox-client" value="client"/>
                <label for="checkbox-client">Je suis client</a></label>
            </p>
            <p class="checkbox">
                <input type="checkbox" id="checkbox-news" name="checkbox-news" value="news"/>
                <label for="checkbox-news">Je veux recevoir les news par email</label>
            </p>
        </div>

        <div class="col-xs-12 button">
            <a href="#" id="submit-signUp" class="js--tracking" data-track_category="signUpPage"
               data-track_action="signUp">suivant</a>
        </div>

    </form>
</div>

<div id="js--pop-up" class="pop-up not-visible">
    <div class="col-xs-10 col-xs-offset-1 col-lg-6 col-lg-offset-3 text-size2 pop-up-content">
        <span class="text-size8 sosh-black yellow">Oups,</span>
        <br><span id="error-reason">vous êtes déjà inscrit pour le tirage au sort ou le format de l'email n'est pas correct</span>

        <div class="inline-button button">
            <a href="#" id="js--pop-up-sign-up" class="js--tracking" data-track_category="signUpPopUp" data-track_action="signUp">je
                m'inscris</a>
            <a href="#" id="js--pop-up-play" class="js--tracking" data-href="game" data-track_category="signUpPopUp" data-track_action="playAgain">je
                rejoue</a>
        </div>
    </div>
</div>

<?php include('view/common/footer.php'); ?>
