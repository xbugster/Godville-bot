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
        doGood: '#actions #cntrl1 .enc_link',
        doBad: '#actions #cntrl1 .pun_link'//,
        // resurrect: '#actions #cntrl1 #concrete_selector' // needs the selector for resurrection button, there is no id or class
    },
    charParamSelectors: {
        hp: '#hk_health .l_val',
        mana: '#cntrl .pbar .gp_val',
        potions: '.battery .acc_val'
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
    _buttons: {},
    _params: {},
    _actualParams: {},
    _errors: {
        firstRun: 0
    }, // dummy, later needs to be replaced with errors manager object
    init: function() {
        this._setButtons(botButtons.init());
        this._setCharParams(botCharParams.init());
        this._setActualValues();
        this._parseValues();
    },
    _parseValues: function() {
          kango.console.log(this._actualParams);
    },
    _setActualValues: function() {
        for(var paramElement in this._params) {
            this._actualParams[paramElement] = this._params[paramElement].text();
        }
    },

    _setButtons: function(_buttons) {
        this._buttons = _buttons;
    },

    _setCharParams: function(_params) {
        this._params = _params;
    },

    nullifyErrors: function() {
        this._errors = {};
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

function runTheBot(){
    var loaded = false;
    if(botCommander._errors.length > 0) {
        botCommander.nullifyErrors();
        botCommander.init();
        kango.console.log(botCommander);
        $(botCommander._buttons.doGood).css({backgroundColor:"#000000"});
        setTimeout(runTheBot(), 1000);
    }else{
        loaded = true;
    }
    return loaded;
}

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
    $(document).ready(function(){
        runTheBot();
    });
}

