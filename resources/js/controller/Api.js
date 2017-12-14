"use strict";

window.oApi = (function () {

    var self = {
        signUp
    };

    /**
     * Convert array of parameters to string
     * @param aParameters
     * @returns {string}
     * @private
     */
    function _parseParametersToString(aParameters) {
        var sResult = '', sKey;
        for (sKey in aParameters) {
            if (aParameters.hasOwnProperty(sKey)) {
                if (sResult.length > 0) {
                    sResult += '&';
                }
                sResult += sKey + '=' + aParameters[sKey];
            }
        }

        return sResult;
    }

    /**
     * Send a request
     * @param sMethod
     * @param sUrl
     * @param sParameters
     * @param aHeaderParameters
     * @returns {*}
     * @private
     */
    function _query(sMethod, sUrl, sParameters, aHeaderParameters) {
        var sReturn = null,
            oRequest = new XMLHttpRequest(),
            sKey;

        if (window.XDomainRequest) {
            oRequest = new XDomainRequest();
        } else if (window.XMLHttpRequest) {
            oRequest = new XMLHttpRequest();
        }
        oRequest.open(sMethod, window.API_URL + sUrl, false);
        // console.log('full url', window.API_URL, sUrl);

        for (sKey in aHeaderParameters) {
            if (aHeaderParameters.hasOwnProperty(sKey)) {
                oRequest.setRequestHeader(sKey, aHeaderParameters[sKey]);
            }
        }

        oRequest.onload = function () {
            sReturn = oRequest.responseText;
        };

        oRequest.send(sParameters);

        return sReturn;
    }

    /**
     * Send GET request
     * @param sUrl
     * @param aParameters
     * @returns {*}
     * @private
     */
    function _get(sUrl, aParameters) {
        var sReturn,
            sParameters = _parseParametersToString(aParameters);
        sReturn = _query('GET', sUrl, sParameters);

        return sReturn;
    }

    /**
     * Send POST request
     * @param sUrl
     * @param aParameters
     * @param aHeaderParameters
     * @returns {*}
     * @private
     */
    function _post(sUrl, aParameters, aHeaderParameters) {
        var sReturn,
            aNewHeaderParameters = {},
            sParameters = _parseParametersToString(aParameters);

        if (aHeaderParameters) {
            for (var sKey in aHeaderParameters) {
                if (aHeaderParameters.hasOwnProperty(sKey)) {
                    aNewHeaderParameters[sKey] = aHeaderParameters[sKey];
                }
            }
        }
        aNewHeaderParameters['Content-type'] = 'application/x-www-form-urlencoded';

        sReturn = _query('POST', sUrl, sParameters, aNewHeaderParameters);

        return sReturn;
    }

    /**
     * Sign up
     * @param aParameters
     */
    function signUp(aParameters) {
        var oResponse = _post('/inscrit.json', aParameters);
        return JSON.parse(oResponse);
    }

    return self;

})();
