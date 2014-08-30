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

var botDefaultSettings = {
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
    initTimeout : 1000, // timeout between calls to init
    defaultValues: {
        hp : { min: 0, actual: 0, max: 0, warn_at: 0 },
        mana : { min: 0, actual: 0, warn_at: 0 },
        potions : { min: 0, actual: 0, warn_at: 0 }
    }
};

var botUserSettings = {};
var botUserSettings = {};
var botSettings = $.extend(botDefaultSettings, botUserSettings);
var botSettings = $.extend(botSettings, botUserSettings);

var botCommander = {
    _buttons: {},
    _params: {},
    _actualParams: {},
    isParamsReceived: false, // this should be errors object, push errors into the object
                             // then check if length > 0 - error appeared.
    init: function() {
        this.fetchCharParams();
    },
    fetchCharParams: function() {
        var _self = this;
        this.isParamsReceived = false; // pre-set to false, in case we re-fetch params we won't mistake

        _self.setButtons(botButtons.fetch());
        _self.setCharParams(botCharParams.fetch());
        _self._setActualValues();
        if(false === _self.isParamsReceived) {
            setTimeout(function(){ _self.fetchCharParams(); }, botSettings.initTimeout)
        } else {
            _self._parseValues();
        }
    },
    _parseValues: function() { // also move to param parser
        for(var _param in this._actualParams) {
            this._actualParams[_param] = BotParamParser.parse(this._actualParams[_param], _param);
        }
        setTimeout(function(){ kango.console.log(botCommander._actualParams)}, 2000);
    },
    _setActualValues: function() { // move to parser
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

    setButtons: function(_buttons) {
        this._buttons = _buttons;
    },

    setCharParams: function(_params) {
        this._params = _params;
    }
};


/**
 * @desc selectors fetcher. supply object with selectors, returns selected elements under same keys as object
 * @param object subject
 * @constructor
 */
function BotSelectorFetcher(subject) {
    this._subject = subject || {};
    this.fetch = function() {
        var _self = this;
        var _r = {};
        for(var botButton in _self._subject) {
            _r[botButton] = $(_self._subject[botButton]);
        }
        return _r;
    };
    this.setSubject = function(subject) {
        this._subject = subject || {};
    }
};

/**
 * @desc selectors fetchers
 * @type {BotSelectorFetcher}
 */
var botButtons = new BotSelectorFetcher(botSettings.buttonSelectors);
var botCharParams = new BotSelectorFetcher(botSettings.charParamSelectors);

/**
 * @todo : botParam needs to be creater, BotParamParser needs to be encapsulated within as Parser,
 * @todo : botSelectorsFetcher needs to be also encapsulated
 */

/**
 * @todo warn_at - needs to be set by user in bot settings, warn user using chrome popup about low/lack amount of subj.
 * @type {{hp: hp, mana: mana, potions: potions}}
 */
var BotParamParser = {
    hp: function(_param) {
        var arr = _param.split(' / ').map(function(val){return parseInt(val);});
        return {actual: arr[0], max: arr[1]};
    },
    mana: function(_param) {
        return {actual: parseInt(_param.replace('%', ''))};
    },
    potions: function(_param){
        return {actual: parseInt(_param)};
    },
    parse: function(_param, _paramName) {
        var _tmp = botSettings.defaultValues[_paramName];
        return $.extend(_tmp, this[_paramName](_param));
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
        setTimeout(function(){$(botCommander._buttons.doGood).css({backgroundColor:"#000000"});}, 3000);
    });
}

