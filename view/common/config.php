<?php

/*********************************************
 *                  _       _     _
 * __   ____ _ _ __(_) __ _| |__ | | ___
 * \ \ / / _` | '__| |/ _` | '_ \| |/ _ \
 * \ V / (_| | |  | | (_| | |_) | |  __/
 * \_/ \__,_|_|  |_|\__,_|_.__/|_|\___|
 *********************************************/

define('HTTP_DOMAIN', 'https://' . $_SERVER['SERVER_NAME']);
define('HTTP_ROOT', HTTP_DOMAIN . '/');
define('END_GAME_DATE', strtotime('2018-01-15 00:00:00'));

if (strpos($_SERVER['SERVER_NAME'], 'jeu.sosh') === false) {
    // TEST
    define('API_URL', 'https://opes.byarmstrong.com/sosh/band/inscrit.json');
} else {
    // PROD
    define('API_URL', 'https://jeu.sosh.fr/inscrit.json');
}