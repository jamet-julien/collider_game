"use strict";
(function () {

    var self = {};

    function _isLandscape() {
        return screen.width > screen.height;
    }

    function _checkOrientation() {
        if (window.oRouter && isMobile.any) {
            if (_isLandscape()) {
                // SHOW POPUP
                if (window.oRouter.oCurrentPage && window.oRouter.oCurrentPage.id !== 'turnMobile') {
                    window.oRouter.displayPageByName('turnMobile');
                }
            }
            else {
                // HIDE POPUP
                if (window.oRouter.oPreviousPage && window.oRouter.oCurrentPage && window.oRouter.oCurrentPage.id === 'turnMobile') {
                    window.oRouter.displayPreviousPage();
                }
            }
        }
    }

    _checkOrientation();

    window.onresize = function () {
        setTimeout(function () {
            _checkOrientation();
        }, 250);
    };

    return self;

})();

