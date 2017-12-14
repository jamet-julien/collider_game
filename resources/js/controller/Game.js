"use strict";

window.GameCtrl = (function () {

    var self = {
            launch,
            signUp,
            setInstance,
            displaySoshHeader
        },instance   = false,
        $timeleft    = document.getElementById('js--time-left'),
        $progressBar = document.getElementById('js--time-elapsed'),
        screen       = "gameLose",
        circleLength = 157;

    /********************************************************
     ____  ____   ___   ____ _____ ____ ____
     |  _ \|  _ \ / _ \ / ___| ____/ ___/ ___|
     | |_) | |_) | | | | |   |  _| \___ \___ \
     |  __/|  _ <| |_| | |___| |___ ___) |__) |
     |_|   |_| \_\\___/ \____|_____|____/____/
     ********************************************************/
    
     function setInstance(_instance) {
        instance = _instance;
        //document.getElementById( 'hightScore').classList.remove('exceed');
        _init();
    }

    /**
     * [_renderScore affiche le score dans la div]
     * @param  {[type]} iScore [nouveau score]
     * @return {[type]}        [description]
     */
    function _renderScore(iScore) {
        for (var iScoreDiv = 0; iScoreDiv < $score.length; iScoreDiv++) {
            $score[iScoreDiv].textContent = iScore;
        }
    }


    function signUp( obj){

        if(instance){
            console.log( 'SIGNUP GC OK');
            return instance.send( obj);
        }else{
            console.log( 'SIGNUP GC KO');
            return Promise.resolve({code:0});
        }

    }

    /********************************************************
     _
     __ _  __ _ _ __ ___   ___    _____   _____ _ __ | |_
     / _` |/ _` | '_ ` _ \ / _ \  / _ \ \ / / _ \ '_ \| __|
     | (_| | (_| | | | | | |  __/ |  __/\ V /  __/ | | | |_
     \__, |\__,_|_| |_| |_|\___|  \___| \_/ \___|_| |_|\__|
     |___/
     ********************************************************/

    function _init(){

            
        instance.on('level.ready', () => {
            RouterCtrl.renderScore(0);
        })
        
        instance.on('level.died', () => {
            RouterCtrl.displayPageByName( screen);
        })

        instance.on('level.tick', ([iMax, iRatetimeElapsed]) => {
            var iSecondsLeft = iMax * iRatetimeElapsed;

            $progressBar.style.strokeDashoffset = circleLength - Math.round(iRatetimeElapsed * circleLength);
            $timeleft.textContent = Math.round( iMax - iSecondsLeft);
        })

        instance.on('level.collide', ([por]) => {
            RouterCtrl.renderScore( por);
        })

        instance.on('level.palierPasted', ([por]) => {
            screen = "gameWin";
        })
        
        instance.on('level.timeout', () => {
            RouterCtrl.displayPageByName( screen);
        })
        
        instance.on('level.allCollide', () => {
            RouterCtrl.displayPageByName( screen);
        })

        instance.on('level.sending', ( oResponse) => {
            RouterCtrl.readResponse( oResponse);
        })
    }

    /**
     * Launch game
     */
    function launch() {
        displaySoshHeader(false);
        instance.play();
    }

    /**
     * Show or hide Sosh header
     * @param bShow
     */
    function displaySoshHeader(bShow) {
        var oSoshHeader = document.getElementById('s-header');

        if (oSoshHeader) {
            if (bShow) {
                oSoshHeader.className = oSoshHeader.className.replace(' height0', '');
            } else {
                if (oSoshHeader && !~oSoshHeader.className.indexOf('height0')) {
                    oSoshHeader.className += ' height0';
                }
            }
        }

    }

    return self;

})();
