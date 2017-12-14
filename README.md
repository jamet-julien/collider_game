# Template pour jeu Sosh

### Système de grille
Identique à bootstrap (https://v4-alpha.getbootstrap.com/layout/grid/)

### Ajouter une page
Créer un fichier sous le nom ...Page.php dans le dossier view, exemple: homePage.php  
Cela créera un élement ```<li id="home">```

### Changer de page
Ajouter un attribut ```data-href="ID_DE_LA_PAGE"``` sur vos liens.  
NB: ```data-href="game"``` redirigera vers la page game (gamePage.php) et lancera le jeu.  
Il est aussi possible d'écrire ```data-href="previous"``` pour revenir à la page précedente.

### Afficher une pop-up
```
<div class="pop-up not-visible">
        <div class="col-xs-10 col-xs-offset-1 text-center text-size2 pop-up-content">

            <div class="close">
                <a href="#" data-href="previous" class="close-invitepopup js--tracking" data-track_category="invitePopup" data-track_action="close">&times;</a>
            </div>

            <span class="text-size8 bold yellow">Invitez</span>
            <br><span id="error-reason">Lorem ipsum dolor sit amet</span>

            <div class="col-xs-12 text-center button">
                <a href="#" class="invite-submit js--tracking" data-track_category="invitePopup" data-track_action="sendInvite">valider</a>
            </div>
        </div>
    </div>
```

### Tracking
Pour ajouter le tracking sur ce lien, ajouter la classe ```"js--tracking"``` ainsi que les balises 
```data-track_category="NOM_DE_LA_PAGE"``` et  ```data-track_action="OBJECTIF_DU_LIEN"```

Exemple :
```
<a href="#" class="js--tracking" data-track_category="homePage" data-track_action="goToNextPage"/>
```

### Avant mise en production
- [ ] Ajouter les images pour le partage FB, Twitter ...
- [ ] Vérifier favicon, règlement ...
- [ ] Minifier les codes grâce à Webpack