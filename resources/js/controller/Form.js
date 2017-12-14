"use strict";

window.FormCtrl = (function () {

    var self = {
            _showErrorPopUp,
            _hideErrorPopUp,
            readResponse
        },
        oPopUp          = document.getElementById('js--pop-up'),
        aInputs         = document.querySelectorAll('input:not([type="checkbox"])'),
        oCheckboxRule   = document.getElementById('checkbox-rule'),
        oCheckboxNews   = document.getElementById('checkbox-news'),
        oCheckboxClient = document.getElementById('checkbox-client');

    function _checkEmail(sEmail) {
        var sRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (sEmail && sRegex.test(sEmail));
    }

    function _checkMobile(sMobile) {
        return (sMobile && sMobile.match(/^0(6|7){1}\d{8}$/g));
    }

    function addListeners() {
        var oSubmitSignUp = document.getElementById('submit-signUp'),
            oSignUpLink, oPlayLink;

        oSignUpLink = document.getElementById('js--pop-up-sign-up');
        oPlayLink = document.getElementById('js--pop-up-play');

        if (oSubmitSignUp) {
            oSubmitSignUp.addEventListener('click', _signUp);
        }
        if (oSignUpLink) {
            oSignUpLink.addEventListener('click', self._hideErrorPopUp);
        }
        if (oPlayLink) {
            oPlayLink.addEventListener('click', function () {
                if (RouterCtrl) {
                    RouterCtrl.bAlreadySignedUp = true;
                }
                self._hideErrorPopUp();
            });
        }

    }

    function _showError(oInputDiv) {
        var oErrorMessage;
        if (oInputDiv) {
            oErrorMessage = oInputDiv.nextElementSibling;

            if (~oInputDiv.className.indexOf('input-error')) {
                oInputDiv.className = ' input-error';
            }

            if (oErrorMessage && ~oErrorMessage.className.indexOf('error') && ~oErrorMessage.className.indexOf('height0')) {
                oErrorMessage.className = oErrorMessage.className.replace('height0', '');
            }
        }
    }

    function _hideError(oInputDiv) {
        var oErrorMessage;
        if (oInputDiv) {
            oErrorMessage = oInputDiv.nextElementSibling;

            if (~oInputDiv.className.indexOf('input-error')) {
                oInputDiv.className = oInputDiv.className.replace('input-error', '');
            }

            if (oErrorMessage && ~oErrorMessage.className.indexOf('error') && !~oErrorMessage.className.indexOf('height0')) {
                oErrorMessage.className += ' height0';
            }
        }
    }

    /**
     * Check single input
     * @param oInput
     * @returns {boolean}
     * @private
     */
    function _checkInput(oInput) {
        var bError;
        if (null === oInput) {
            bError = true;
        }
        else {
            if (~oInput.id.indexOf('telephone')) {
                bError = (!_checkMobile(oInput.value));
            }
            else if (~oInput.id.indexOf('email')) {
                bError = (!_checkEmail(oInput.value));
            }

            bError = (bError) ? true : (oInput.value === '');

            if (bError) {
                _showError(oInput);
            }
            else {
                _hideError(oInput)
            }
        }

        return bError;
    }

    function _signUp() {
        var bError, globalError = false, aParameters, iInput, sName, oResponse;

        RouterCtrl.displayLoading(true);

        //CHECK ALL INPUTS
        for (iInput = 0; iInput < aInputs.length; iInput++) {
            bError = _checkInput(aInputs[iInput]);
            globalError = (bError) ? true : globalError;
        }

        if (oCheckboxRule) {
            bError = (oCheckboxRule.checked === false);
            globalError = (bError) ? true : globalError;
            if (bError) {
                if (!~oCheckboxRule.className.indexOf('input-error')) {
                    oCheckboxRule.className += ' input-error';
                }
            } else if (~oCheckboxRule.className.indexOf('input-error')) {
                oCheckboxRule.className = oCheckboxRule.className.replace('input-error', '');
            }
        }

        bError = (null === oCheckboxNews);
        globalError = (bError) ? true : globalError;

        RouterCtrl.displayLoading( false);

        if (!globalError) {
            aParameters = {};

            for (iInput = 0; iInput < aInputs.length; iInput++) {
                sName = aInputs[iInput].id.substr(6, aInputs[iInput].id.length);
                aParameters[sName] = aInputs[iInput].value;
            }

            if (oCheckboxRule && oCheckboxRule.checked) {
                aParameters['rule'] = 1;
            }
            if (oCheckboxNews && oCheckboxNews.checked) {
                aParameters['news'] = 1;
            }
            if (oCheckboxClient && oCheckboxClient.checked) {
                aParameters['client'] = 1;
            }

           GameCtrl.signUp( aParameters);

        }
    }

    function readResponse(oResponse){
        let iInput;

        if (oResponse.code) {

           return true;

        } else {

            for (iInput = 0; iInput < aInputs.length; iInput++) {
                if ((oResponse.error == undefined) || ~oResponse.error.indexOf(aInputs[iInput].name)) {
                    _showError(aInputs[iInput]);
                }
            }

            if (oCheckboxRule && !~oCheckboxRule.className.indexOf('input-error') && oResponse.error && ~oResponse.error.indexOf('rules')) {
                oCheckboxRule.className += ' input-error';
            }

            // MAYBE ALREADY SIGNED UP
            if ((oResponse.error == undefined) || ~oResponse.error.indexOf('email')) {
                self._showErrorPopUp();
            }

            return false;
        }
    }

    function _showErrorPopUp() {
        if (oPopUp) {
            oPopUp.className = oPopUp.className.replace(' not-visible', '');
        }
    }

    function _hideErrorPopUp() {
        if (oPopUp) {
            oPopUp.className += ' not-visible';
        }
    }

    addListeners();

    return self;

})();