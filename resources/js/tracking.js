(function (global) {

    var Tracking = function (aElement, sEvent) {

        var oPublic = {
                trigger: trigger,
                launch: launch
            },
            _aElement,
            _sEvent;

        /**
         * [constructor description]
         * @param  {[type]} aElement [description]
         * @param  {[type]} sEvent   [description]
         * @return {[type]}          [description]
         */
        function init(aElement, sEvent) {
            _aElement = [].slice.call(aElement);
            _sEvent = sEvent || 'click';
        }

        /**
         * [trigger description]
         * @return {[type]} [description]
         */
        function trigger() {
            var aTracking = ['send', 'event'],
                aTrackingFb = ['track'],
                aData = [].slice.call(arguments);

            global.ga.apply(
                global,
                aTracking.concat(aData)
            );

            global.fbq.apply(
                global,
                aTrackingFb.concat(aData)
            );

            return oPublic;
        }

        /**
         * [launch description]
         * @return {[type]} [description]
         */
        function launch() {

            _aElement.map(function (oElement) {
                oElement.addEventListener(_sEvent, function () {

                    var aTracking = ['send', 'event'],
                        aTrackingFb = ['track'],
                        aIndexGA = ['track_category', 'track_action', 'track_label', 'track_value'],
                        oDataset = this.dataset;

                    if (typeof this.tracking == 'undefined') {
                        aIndexGA.forEach(function (sKey) {
                            if (typeof oDataset[sKey] != 'undefined') {
                                aTracking.push(oDataset[sKey]);
                                aTrackingFb.push(oDataset[sKey]);
                            }
                        });
                        this.tracking = aTracking;
                        this.trackingFb = aTrackingFb;
                    }

                    global.ga.apply(
                        global,
                        this.tracking
                    );

                    global.fbq.apply(
                        global,
                        this.trackingFb
                    );
                });
            });

            return oPublic;
        }

        init(aElement, sEvent);

        return oPublic;

    };

    global.Tracking = Tracking;

})(window);


(function (global) {

    var oTracking,
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

    oTracking = Tracking(document.querySelectorAll('.js--tracking'), Action.down);
    oTracking.launch();

    /**

     // -- Afin de le lancer à un moment autre --

     oTracking.trigger('time','timeout');

     */

})(window);