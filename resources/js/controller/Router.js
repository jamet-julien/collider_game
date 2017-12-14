"use strict";

window.RouterCtrl = (function () {

    var self = {
            displayPreviousPage,
            displayPageByName,
            displayLoading,
            renderScore,
            readResponse,
            oCurrentPage: null,
            oPreviousPage: null
        },
        bAlreadySignedUp = false,
        $score       = document.getElementsByClassName('score'),
        _oLoadingDiv = document.getElementsByClassName('loading')[0];

    function _init( instance) {
        var sPageName = 'home';

        self.displayLoading(true);

        // ADD LINKS
        document.body.addEventListener('click', function (e) {
            _linkListener(e);
        });

        self.displayPageByName(sPageName);
        self.displayLoading(false);



        if (instance != null) {
            GameCtrl.setInstance( instance);
        }

        self.renderScore(CONF.score);

    }

    function readResponse( oResponse){

        if( FormCtrl.readResponse( oResponse)){

            displayPageByName('cheer');
            bAlreadySignedUp = true;

        }

        displayLoading(false);

    }

    function renderScore(iScore) {
        for (var iScoreDiv = 0; iScoreDiv < $score.length; iScoreDiv++) {
            $score[iScoreDiv].textContent = iScore;
        }
    }

    function _linkListener(oEvent) {
        var sDataHref, oElement;
        if (oEvent.target) {
            oElement = oEvent.target;

            // CHANGE PAGE
            sDataHref = oElement.getAttribute('data-href');

            // CHECK PARENT
            if (sDataHref === null && oElement.tagName === 'SPAN' && oElement.parentElement.getAttribute('data-href') !== '') {
                oElement = oElement.parentElement;
                sDataHref = oElement.getAttribute('data-href');
            }

            if (sDataHref && sDataHref !== '') {
                if (sDataHref === 'previous') {
                    self.displayPreviousPage();
                }
                else {
                    self.displayPageByName(sDataHref);
                }
            }

            // LAUNCH GAME
            if ( sDataHref === 'canvas') {
                GameCtrl.launch();
            }

        }
    }

    /**
     * Hide previous page and show given page
     * @param oPage
     * @private
     */
    function _displayPage(oPage) {
        if (oPage) {
            if (self.oCurrentPage && ~self.oCurrentPage.className.indexOf(' active')) {
                self.oCurrentPage.className = self.oCurrentPage.className.replace(' active', '');
                self.oPreviousPage = self.oCurrentPage;
            }
            if (!~oPage.className.indexOf(' active')) {
                oPage.className += ' active';
            }
            self.oCurrentPage = oPage;
        }
    }

    /**
     * Display previous page
     */
    function displayPreviousPage() {
        if (self.oPreviousPage) {
            _displayPage(self.oPreviousPage);
        }
    }

    /**
     * Hide previous page and show given page
     * @param sPage
     */
    function displayPageByName(sPage) {
        var oPage = document.getElementById(sPage);
        if (oPage) {
            _displayPage(oPage);
        }
    }

    /**
     * Show/hide loading sign
     * @param bShow
     */
    function displayLoading(bShow) {
        if (_oLoadingDiv) {
            if (bShow) {
                if (~_oLoadingDiv.className.indexOf('not-visible')) {
                    _oLoadingDiv.className = _oLoadingDiv.className.replace(' not-visible', '');
                }
            } else {
                if (!~_oLoadingDiv.className.indexOf('not-visible')) {
                    _oLoadingDiv.className += ' not-visible';
                }
            }
        }
    }

    Game( function ( instance) {
        _init( instance);
    });

    return self;

})();