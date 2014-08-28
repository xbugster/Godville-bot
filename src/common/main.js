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
    initTimeout : 1000 // timeout between calls to init
};

var botCommander = {
    _buttons: {},
    _params: {},
    _actualParams: {},
    isParamsReceived: false, // this should be errors object, push errors into the object
                             // then check if length > 0 - error appeared.
    init: function() {
        this._delayedInit();
        /**
         * @DEBUG
         */
        $(botCommander._buttons.doGood).css({backgroundColor:"#000000"});
    },
    _delayedInit: function() {
        var _self = this;

        _self._setButtons(botButtons.init());
        _self._setCharParams(botCharParams.init());
        _self._setActualValues();
        if(false === _self.isParamsReceived) {
            setTimeout(function(){ _self._delayedInit(); }, botCommander.initTimeout)
        } else {
            _self._parseValues();
        }
    },
    _parseValues: function() {
        for(var _param in this._actualParams) {
            this._actualParams[_param] = botParamParser[_param](this._actualParams[_param]);
        }
        setTimeout(function(){ kango.console.log(botCommander._actualParams)}, 2000);
    },
    _setActualValues: function() {
        for(var paramElement in this._params) {
            var _tmp = this._params[paramElement].text();
            if(_tmp != '') {
                this._actualParams[paramElement] = _tmp;
                this.isParamsReceived = true;
            } else {
                this.isParamsReceived = false;
            }

        }
    },

    _setButtons: function(_buttons) {
        this._buttons = _buttons;
    },

    _setCharParams: function(_params) {
        this._params = _params;
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
 * @todo default values needs to be moved out to settings(abstraction level setup?)
 * @todo warn_at - needs to be set by user in bot settings, warn user using chrome popup about low/lack amount of subj.
 * @type {{hp: hp, mana: mana, potions: potions}}
 */
var botParamParser = {
    hp: function(_param) {
        var _tmp = { min: 0, actual: 0, max: 0, warn_at: 0 }; // warn and resurrect if auto-resurrect is set
        var arr = _param.split(' / ');
        _tmp.actual = parseInt(arr[0]);
        _tmp.max = parseInt(arr[1]);
        return _tmp;
    },
    mana: function(_param) {
        var _tmp = { min: 0, actual: 0, warn_at: 0 };
        _tmp.actual = parseInt(_param.replace('%', ''));
        return _tmp;
    },
    potions: function(_param){
        var _tmp = { min: 0, actual: 0, warn_at: 0 };
        _tmp.actual = parseInt(_param);
        return _tmp;
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
    $(document).ready(function(){
        botCommander.init();
    });
}

