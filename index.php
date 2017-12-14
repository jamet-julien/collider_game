<?php

include_once('view/common/config.php');
include_once('view/common/header.php'); ?>

<ul class="pages">
    <?php

    if (time() < END_GAME_DATE) {
        $aFiles = scandir('view');
        foreach ($aFiles as $sFile) {
            $iPosition = strpos($sFile, 'Page.php');
            if ($iPosition !== false) {
                $sPageName = substr($sFile, 0, $iPosition);
                echo '<li id="' . $sPageName . '">';
                include_once('view/' . $sFile);
                echo '</li>';
            }
        }
    } else {
        echo '<li id="game-done" class="active">';
        include_once('view/gameIsDonePage.php');
        echo '</li>';
    }

    ?>
</ul>

<div class="loading">
    <img src="images/loading.png" alt="Chargement"/>
</div>

<?php include_once('view/common/jsfiles.php'); ?>
</body>
</html>
