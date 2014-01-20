// ==UserScript==
// @name GodVille Bot
// @include http://*
// @include https://*
// @include about:blank
// @require jquery-1.9.1.min.js
// ==/UserScript==

var $ = window.$.noConflict(true); // Required for Opera and IE

var _extTopIcon = $(document.createElement('img')).attr({
    //src: 'http://kangoextensions.com/misc/tree.png',
    title: 'GodVille Bot'
}).css({
    position: 'absolute',
    top: '10px',
    left: document.body.clientWidth - 280 + 'px',
    'z-index': '10000'
}).appendTo(document.body);

_extTopIcon.click(function() {
    alert('Extention Panel Click');
});

var botSettings = {
    buttonSelectors: {
        doGood: '#action #cntrl1.enc_link',
        doBad: '#action #cntrl1.pun_link'//,
        //resurrect: '' // needs the selector for resurrection button
    },
    charParamSelectors: {
        hp: '#hk_health.l_val',
        mana: '#cntrl.p_bar.gp_val',
        potions: '.battery.acc_val'
    },
    init: function() {
        // a method to get user defined settings.
        // such as lower level hp
        // bricks forging
        // until potions amount is higher than
        // etc.
    }
};

var botCommander = {
    _buttons: null,
    _params: null,
    _actualParams: null,
    init: function() {
        this._buttons = botButtons.init();
        this._params = botCharParams.init();
        this._setActualValues();
    },
    _setActualValues: function() {
        for(var paramElement in this._params) {
            kango.console.log($(this._params[paramElement]).val());
        }
    }
};

var botButtons = {
    init: function() {
        var _r = {};
        for(var botButton in botSettings.buttonSelectors) {
            _r[botButton] = $(botSettings.buttonSelectors[botButton]);
        }
        return _r;
    }
};

var botCharParams = {
    init: function() {
        var _r = {};
        for(var charParam in botSettings.charParamSelectors) {
            _r[charParam] = $(botSettings.charParamSelectors[charParam]);
        }
        return _r;
    }
};
/**
 * Action, Please!
 */
// Shorten the IF statement
var isWindowTop = window == window.top;
var isHostMatch = ( window.location.host == 'www.godville.net' || window.location.host == 'godville.net' );
var isHostnameMatch = ( window.location.hostname == 'www.godville.net' || window.location.hostname == 'godville.net' );
var isPathMatch = ( window.location.pathname == '/superhero' || window.location.pathname == 'superhero' );

if( true === isWindowTop
&& ( true === isHostMatch || true === isHostnameMatch )
&& true === isPathMatch
) {
    botCommander.init();
    kango.console.log(botCommander);
}

