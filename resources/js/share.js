(function (global) {

    var Sharing = function (aElement, sEvent) {

        var oPublic = {},
            _aElement,
            _sEvent,
            oText = {
                twitter: "On vous redonne le sourire avec 3 Samsung Galaxy S8 à gagner #SoshRentree",
                facebook: null
            },
            oShare = {
                twitter: "https://twitter.com/intent/tweet?text=[TEXT]&url=[URL]",
                facebook: "https://www.facebook.com/sharer/sharer.php?u=[URL]"
            };

        /**
         * [constructor description]
         * @param  {[type]} aElement [description]
         * @param  {[type]} sEvent   [description]
         * @return {[type]}          [description]
         */
        function init(aElement, sEvent) {
            _aElement = [].slice.call(aElement);
            _sEvent = sEvent || 'click';
            _launch();
        }

        /**
         * [launch description]
         * @return {[type]} [description]
         */
        function _launch() {

            _aElement.map(function (oElement) {

                var oParam = oElement.dataset,
                    sUrlEncode = encodeURIComponent(window.API_URL),
                    sUrlResult,
                    sUrl = oShare[oParam.social],
                    sText = encodeURIComponent(oText[oParam.social]);

                sUrlResult = sUrl.replace('[TEXT]', sText)
                    .replace('[URL]', sUrlEncode);

                oElement.setAttribute('href', sUrlResult);
            });

            return oPublic;
        }

        init(aElement, sEvent);

        return oPublic;

    };

    global.Sharing = Sharing;

})(window);

(function (global) {

    var oSharing,
        Action = {
            down: 'mousedown',
            move: 'mousemove',
            up: 'mouseup'
        };

    if ('ontouchstart' in window) {
        Action = {
            down: 'touchstart',
            move: 'touchmove',
            up: 'touchend'
        };
    }

    oSharing = Sharing(document.querySelectorAll('.js--sharing'), Action.down);

    global.oSharing = oSharing;

    /**

     // -- Afin de le lancer à un moment autre --

     oTracking.trigger('time','timeout');

     */

})(window);
